"""從美術設計稿切出 caishen-lotto-demo 的 skin PNG（720x1280 設計基準）。

設計稿：D:\\Gemini_Generated_Image_a40j52a40j52a40j.png  (1438x2976)
輸出：  C:\\Users\\user\\caishen-lotto-demo\\skin\\*.png
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import os

SRC = r"D:\Gemini_Generated_Image_a40j52a40j52a40j.png"
OUT = r"C:\Users\user\caishen-lotto-demo\skin"
W, H = 720, 1280

im = Image.open(SRC).convert("RGB")
AW, AH = im.size
a = np.asarray(im).astype(np.uint8)

# ---- 設計稿量到的關鍵框（原圖像素） -------------------------------------
FRAME = (38, 613, 1400, 1966)        # 盤面外框
CARD = (252, 829, 1178, 1745)        # 中央紅卡
RIBBON = (252, 826, 1178, 972)       # 卡片頂端「財神樂透」緞帶
MASCOT = (294, 1000, 690, 1490)      # 財神內嵌面板
TITLE_BAND = (0, 0, AW, 282)         # 頂端標題美術字（含蝙蝠）
BOTTOM_BAND = (0, 2570, AW, AH)      # 金幣堆 + 底部狀態列
BAR_TOP = 2758                       # 底部狀態列上緣
BTN_BAND = (2204, 2398)              # 設計稿的按鈕列（bg 要抹掉，改由程式畫）

# ---- 版面（設計像素 720x1280） -----------------------------------------
DES_FRAME = (24, 205, 672, 672)      # x, y, w, h
BOTTOM_PASTE_Y = 1077                # 金幣堆 + 狀態列貼上的位置
TITLE_H = 141


def _smooth(v, sigma=26):
    """沿 y 做高斯平滑，濾掉邊緣金幣造成的色斑。"""
    n = len(v)
    r = int(sigma * 2)
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2)
    k /= k.sum()
    pad = np.pad(v, ((r, r), (0, 0)), mode="edge")
    return np.stack([np.convolve(pad[:, c], k, mode="valid") for c in range(v.shape[1])], axis=1)


def rows_interp(arr, y0, y1, xl=24, xr=696, feather=14):
    """把 y0..y1 的 xl..xr 抹成平滑背景漸層；兩側邊緣（金幣裝飾）原樣保留。"""
    m = 40
    ya, yb = max(0, y0 - m), min(arr.shape[0], y1 + m)
    L = np.percentile(arr[ya:yb, max(0, xl - 18):xl + 2].astype(float), 40, axis=1)
    R = np.percentile(arr[ya:yb, xr - 2:xr + 18].astype(float), 40, axis=1)
    L, R = _smooth(L), _smooth(R)
    t = np.linspace(0, 1, xr - xl + 1)[:, None]
    h = y1 - y0
    for i in range(h):
        y = y0 + i
        cl, cr = L[y - ya], R[y - ya]
        line = cl[None, :] * (1 - t) + cr[None, :] * t
        k = 1.0
        if i < feather:
            k = i / feather
        elif h - i < feather:
            k = (h - i) / feather
        cur = arr[y, xl:xr + 1].astype(float)
        arr[y, xl:xr + 1] = np.clip(cur * (1 - k) + line * k, 0, 255).astype(np.uint8)
    return arr


def build_bg():
    base = np.asarray(im.resize((W, H), Image.LANCZOS)).astype(np.uint8).copy()

    def d_y(art_y):
        return int(round(art_y * H / AH))

    # 1) 抹掉設計稿裡「程式會自己畫」的東西：盤面 + 跑馬燈 + 按鈕列
    rows_interp(base, d_y(FRAME[1]) - 6, d_y(FRAME[3]) + 8)
    rows_interp(base, d_y(BTN_BAND[0]) - 18, d_y(BTN_BAND[1]) + 20, xl=24, xr=696)

    bg = Image.fromarray(base).filter(ImageFilter.GaussianBlur(0.6))

    # 2) 貼回原比例的標題美術字
    title = im.crop(TITLE_BAND).resize((W, TITLE_H), Image.LANCZOS)
    bg.paste(title, (0, 0))

    # 3) 貼回原比例的金幣堆 + 底部狀態列
    bh = int(round((BOTTOM_BAND[3] - BOTTOM_BAND[1]) * W / AW))
    bottom = im.crop(BOTTOM_BAND).resize((W, bh), Image.LANCZOS)
    bg.paste(bottom, (0, H - bh))

    # 4) 洗掉狀態列牌子上「印死」的帳號與金額（這兩格改由程式即時畫）
    b = np.asarray(bg).astype(np.uint8).copy()
    for (x0, x1, y0, y1, sx0, sx1) in (
        (16, 286, 1180, 1223, 30, 62),     # 上格：帳號 ID（灰底）
        (56, 286, 1229, 1270, 58, 88),     # 下格：餘額（深底，左側籌碼圖示保留）
    ):
        col = _smooth(np.median(b[y0:y1, sx0:sx1].astype(float), axis=1), 6)
        for y in range(y0, y1):
            b[y, x0:x1] = col[y - y0].astype(np.uint8)
    bg = Image.fromarray(b)

    bg.save(os.path.join(OUT, "bg.png"))
    print("bg.png", bg.size, "bottom paste y =", H - bh,
          "bar top =", H - bh + int((BAR_TOP - BOTTOM_BAND[1]) * W / AW))
    return H - bh


def rounded_alpha(img, radius):
    m = Image.new("L", img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, img.size[0] - 1, img.size[1] - 1],
                                        radius=radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(m)
    return out


def build_board_frame():
    fx0, fy0, fx1, fy1 = FRAME
    fr = np.asarray(im.crop(FRAME)).astype(np.uint8).copy()
    ox, oy = fx0, fy0

    # 盤面內圈（24 格的位置）填成底色 —— 格子由程式畫，避免美術稿的格子露出來
    ring = (78, 651, 1348, 1928)
    dark_top = np.array([40, 26, 17], float)
    dark_bot = np.array([56, 38, 25], float)
    for y in range(ring[1], ring[3]):
        t = (y - ring[1]) / (ring[3] - ring[1])
        c = (dark_top * (1 - t) + dark_bot * t).astype(np.uint8)
        if CARD[1] <= y < CARD[3]:
            fr[y - oy, ring[0] - ox:CARD[0] - ox] = c
            fr[y - oy, CARD[2] - ox:ring[2] - ox] = c
        else:
            fr[y - oy, ring[0] - ox:ring[2] - ox] = c

    # 中央紅卡內部清空（緞帶／財神／賠率表／獎池數字都由 sprite 或程式畫）
    cx0, cy0, cx1, cy1 = 286, 975, 1146, 1715
    col = np.median(a[cy0:cy1, 258:292].astype(float), axis=1)   # 卡片左側乾淨帶
    col = _smooth(col, 18)
    for y in range(cy0, cy1):
        fr[y - oy, cx0 - ox:cx1 - ox] = col[y - cy0].astype(np.uint8)

    img = Image.fromarray(fr).filter(ImageFilter.GaussianBlur(0.8))
    img = img.resize((DES_FRAME[2], DES_FRAME[3]), Image.LANCZOS)
    img = rounded_alpha(img, 18)     # 切掉四角外溢的金幣碎片
    img.save(os.path.join(OUT, "board-frame.png"))
    print("board-frame.png", img.size)


def art_to_design(box):
    """原圖框 → 設計像素框（相對盤面外框換算）。"""
    fx0, fy0, fx1, fy1 = FRAME
    sx = DES_FRAME[2] / (fx1 - fx0)
    sy = DES_FRAME[3] / (fy1 - fy0)
    x0 = DES_FRAME[0] + (box[0] - fx0) * sx
    y0 = DES_FRAME[1] + (box[1] - fy0) * sy
    return (round(x0), round(y0), round((box[2] - box[0]) * sx), round((box[3] - box[1]) * sy))


def build_pieces():
    for name, box, radius in (
        ("deco-title", RIBBON, 10),
        ("deco-mascot", MASCOT, 26),
    ):
        d = art_to_design(box)
        piece = im.crop(box).resize((d[2] * 2, d[3] * 2), Image.LANCZOS)
        piece = rounded_alpha(piece, radius * 2)
        piece.save(os.path.join(OUT, name + ".png"))
        print(name + ".png", piece.size, "→ layout", d)


def build_ingots(paste_y):
    """金幣堆：與 bg 同一塊像素，位置對齊（bg 缺圖時也有東西可看）。"""
    bar_des_y = paste_y + int(round((BAR_TOP - BOTTOM_BAND[1]) * W / AW))
    h = bar_des_y - paste_y
    src_h = int(round(h * AW / W))
    piece = im.crop((0, BAR_TOP - src_h, AW, BAR_TOP)).resize((W, h), Image.LANCZOS)
    piece.save(os.path.join(OUT, "deco-ingots.png"))
    print("deco-ingots.png", piece.size, "→ layout x0 y%d w720 h%d" % (paste_y, h),
          "| bar top =", bar_des_y)
    return paste_y, h, bar_des_y


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    py = build_bg()
    build_board_frame()
    build_pieces()
    build_ingots(py)
