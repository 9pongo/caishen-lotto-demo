"use strict";
(() => {
  // src/types.ts
  var WishError = class extends Error {
    constructor(kind, message) {
      super(message);
      this.kind = kind;
    }
  };

  // sim-src/paytable.enc.json
  var paytable_enc_default = { salt: "vZlFX5QTehmqrNaAA6yFlA==", iv: "o7NXAmg4vyIDm9Za", data: "yHrf9SQTk/zkMjxEkqu0puMhLqnhTcWMomGd5IJCxfduOgbX6hzmONCEQhhsGlARv2cNXVAqGqQsFQt7kC0hxI3Yfb175F2QTGX5dVJOnHx2TD/mRcuOREpOmIAgNn64uFUWX8X72QU+jrdV+4qxH0aYgNE55qQ790u22cH5Bc0IkVPeCnx2dB9DtQ1eNEZaV4jDWMmU42XGLFt6J7pJ8nXDDXBQdhDjJqdaFpk9X7yK+wCD2ukM/EVKAK14G2Ci5B77HrkO7ckHLT04BrtZMS+ICU8b03BGGEwygd7a0USOb2x84cAKMScFC8Egf2qi/aOb59mvCsXR4o6JbrwENVSmfVruJam5M0aWjJCGRa7w7WMUr6DRYhUkv80YwNALHrMx+cZ/sqBtOq/y2rv4oZeBXB2V39Keb4QZPC3J7NqU8Bw3njNQu03jsng7/trDw8S7YIxniVEMOhxjez8Att172+Hi9lbg40NcmGmVgKSjtp1sN70YO7tCkMquA7+CkbpvnIo2eeqHXPCPOl89gYkSDuPbtk1Rwwa2p2YP7kPfwL1Fp3fjNmibwaK5qGwd3CNehRRGmMghoHtIv+vohM9+qzsv6vkUSKfMbtLVxa+u68+qbO1WHZI3PpPvzOoclpBI2xnUj2sUHaIQTeeW+PgKE7VRX7YdcjJJZpTSUG2Hv4nyRy4ERGME2rZCPCkZcFXXEg2H/QaJuOYBZoitEx/kGJzUxGIc9cwnEn2i8DBpkk4/zaJeOrkNV5/2fAuruVGPgZh9lSYi9+CeDAtKkcxP/RKlzL18A0mS+knDypvRaA6NslKnvR37Q0q50vRVDvF1VTEi2I+CcwM3i/Am23/ZmOiGUfBHbKut3ZNDkrJspKH2kIWlTwiWaEMuLBDqzRuIv5pPEt6RInuHucX51y7AooZAA1h+a+QpRkNWyo0UmPAxhKYG7cGDGT/ELAA8hM4gVRIVd3+ABmxF9zGD3/4RfFj/8ESUaIDthPtVsWE0bzfbsdB1yymO9wtGLFpWUXAt7lROmwqNGbDaUI//sgjXvFyJo7y8HIk2KrQTogFZnjayKaAnMRruGSFaNspMQsFFwXHPgfkefTpk5GmPHAIrMzo94p2iBpOS0RerxrtDrxQZcelio9KfFP/VV3MC8kaTYmaSPlhXS1JAOZzMsW2YJjc9mwkB/2Xwh0X/UHp6M9I0B02+wmu83ID4kWFJBWcmqOkFeQWuF9bLbooa7sPDh3ZxBWaJt1DyTVvTp79VKxLrUISDltGniczEt3Me6w0lQJBac+NM0D2J7I1pe9Nwp+vCO1i1qPt/9za4LZHp4bgGmE/1fL5bknpgWKM6RCLNQDD+4fimpzk7yYCLnc7XCGWDlzB01UVMBrFrTxhhIM44cP5Rt0hqVyR+ZaGwY5NpkI6Fm9+Z4OYQ/FO7RhowWPg/esMe4YrZfoeGWZBp+ZLTBFUhQPRTbiJTWrG7XAq4sT8cpFLGNcHdWtBPyuybW49+V3cLV2tri7wqs0+q8dLCDqh1AdVCy0zbAIOLGSjSxQHtmNWvB8HhVfEB8YxEVBrCQudK8jZqEMoQ4bmDTBNt8MqK/sJRB74ZhI9mn8LhKySL+Vrft83JoMvDaI44Qm+nxjmqMFohJoKV27TXNyHU0thqSS78UkMrFNugVGPtixTnR1yXGzsNIOQLf67jxoF2gv+9+sUFcv3PkYjVdxgj52RPxnXJLM3l7Jgc6u/zalC5dkfQVaG6YOauGpYU85hi1MsUpsOYvLVodaLrZ5Vws7Ilndc0RAe1MjjKxrUsYopKrhHZXy2hLclKBoFvRsT6SDIetfuzJTNm6FVi9FBIoAWDuQxV8B/kiDLkUwBmg69QJJY1/rNQ2it5amq2Zpt/t/RGHe5pEkZtr5xVdrOCwu1MDpuGVKkJiZJMkGw5BCXdvPXlr//dXllQOFzNFx9MFwvE4MV96bF1QzOHFNY8NEScshQVtMnNrfLuD4pdh+lbZ2q0F1Syt+RsdS8EMJAhpdle3QI3CY++zOBJNFczQBbu3Vqfs/tA0vDlePfHrBMdngePq3e3ZPY7Pu/uLWFxaXY2YJByqfs+0AaFN3zpKFpeqdQ5IveOmIBxnrwTSms0lubxE3289Ad56fFcg5JklG8QyotkMvsMlgYVYGoMng/CsU3+WN7bPZVPyTCw4YzhwX8+TfoehBgxZ3Xuk35r/xirWjxPuqymWqwqy2ypP2yRCHdvG4dDNGenNT8L13P25AfkmdaNRLQElKsUsd+Afj/gAWqto9ZqAXQZ4Q0hIuORHADyQDvh30iqa+Sfh92pcvg5LaoEYIhc1era5Le1oiSxOsQfMOZ52ftNdiuDIUSJZakMr6NSFsMshRTtWsMYMhpk6x1L8DaC1aWCPSKw8VdG4mKTs2BZ0XV30Y+8HlV7hB4xfNri5uYDis6dJeUaICd23GUVFzTsIjRmbq/nUEAM2sFnTKiexU7SbvksmwozFT8VOUuufM83WaTIUAYN1dtzLifAdmVPDW8cEF9l1fnQL8VaIUIVo6K3JAO7R/fLG3NSuE60xDYqX6iY/A/HgJhoC1xAtDYfA7+4LNrQh3ulwtW7CpQtyFvbdHiKbGIkTyE7b8poKRA1SuIpkkiNt2YYeX81ff3HQcuQ4caFV/AwRkz7g1Bb09SmKtsbRMdoJgrthpaPtNLKHUIwIx962+27/DND6P66WshBFu/z+aK6PdPDUXhFfCoxyUEAB8v5kEWKFwnD48gta2WtuQhkvs6K3TVG6F9RQ2/cIoHLd8uwWOl33WksZ/Sq/hE+wWjpLVfwFQ8f9GbmSDs+vK3BpWCA2PsAoDJPw1y01mAGQOso+2N3Q8HZ3cTGI4n03fJY7b1njRh8ma6GQNqtm/EoLK8u8+E0qhpnZEu9FnATqf4OJWt4T3GKqbUN+a4gyzr0rvBocpDbI4nJHETQIwOcwAaCKZHoSLUVAdzDvjfU5/2yYYftDB1Hh2QJ22s7BPnfM2arjaLXn1UsBqUGLStFlyZQopOi+3d+Zq2iHxhlriq4WDCkkjBIr11TPLDMIc5b3XLkGGhh9r4N0LyD982VdJoURiL0P8JIOhqIFD70PH3yOmb0uX825V43wfUPBDggCl4XaI+HBpTw7ZgTXSBxz7JNE7hHHRKyS+hIBOoTc7wD3LCpaDFkmvhGYiXo+XAhiVmemVhH0rw6ohmUQkG/nH5hLW4SG0eYHi9BnobwDWFwF+7GNurLALYSsSpcayjb9ZA/CJ+oHXfxfujyGPjHATn9MhTmc2L+DiEt9nj63gO8bRWxA9Lqh2FwfLs/1gxW53bUfn52IXr0ebbrOGtGhXJy5HG31W8pbXTPOYA/VjB/FYUHaek06vAb+LeoMYqEVE5snY6hZEIjHijZR2k1y3iDscoTo7K/nJ1JEKEpymjjh0BRFEajzIG6arJltN/rrhUkPkZHY0kRRtXb/xx7DHt2/xdGq5zydbIeRKX73bWeby8O4vJvPQ3BaHlGiv2Gxx4VUXP8eNN++0dujWP3ioOqXBHRriqodlYJKzDw/gmFj7m1wQ8nlUvWi8CH0jPOPLVbyO4lNwWBUO2B83zkHYU2K32JDltlUEV4N5KBknpZc23puDSyWQFrsNOinF2rUvGUYP5ASWOxwedKMOHs6Njki/vPevr4cfi8BcdOyJ9otGqSM9TRHgCEQn/fIF28R92G/GGhtjJuU6BKfN+KHMsIMfoVktwkwSdHBDT73mrElaO9m6k/yb7gj71BOo2BSK/9/W1pKwVMJKUBJkzYAj1+IB4z4f8QHOo0EFaJLgHYFK0QIOVzdcJ2Q/sGMiLrxMv7wV4/t4ZIH4msEAEXW14XKUCATk0DeHHs7wP3nD0v2aGsqm9i/pvVXhCMOQuAdtLU4IeHc1NE6sG4eQ8RjZk0QQIoaqZYXT/LXPC20KcuInSp1KG9cdDE/4dJ9FCJ/+Wdu6vW4K3saktk2kcRVHlMmUrccblT++aNKen3SJOy/14yx72XHlxxzFyJ6TFA1WTDh+LNg4XXOXxQ6qaOAiqyopFul/2/Vg8dlsLl8L/5+TR1V2e/2NMoUy9tkCPQAOpBtxeSN1LUP6E73JEefnXn1Y3EwuX2VRZe2rUxrTwCBh1fEILa8B6dpe1zJBvQ8/RwctZXKAy/gHcLtThaMi8qLhbyQKUwgKY390CbA5GjtJ8Ryn7pNS4xbbgzCk4zlMY6CYDRpirgW46K5DDvX2d/znaf1Muj7BRhEUgwEnFw4v0cCCPquPPIYs5gNznsLoeRU0spyMo9dgYnLYcyZGTmdrlCnS/MpVEqOVT8e+bG5DQxJSbQGZBd1obTxOvCKwTCYscwXv3StKH6goVcNZRzvRzg23jCixRSz6NVtHbfPLtffC8B/EGQ4USJ112Bohfgj4Ucl5knHEi/0HDNWgOH/EolJOr2tg8+E+aePyYX6yMSEPHAZLZNGiGfy31PZAfTDIdLGIHO55ov2nTK1c2p/gd7ildPtYN/+cONwP41G5TUiQGeev77k6y+piBvHEtksSshpoTjtj+ku4rEz0kczKYBN7Gwe8uqnSKxWRu7fl0+UeIuLR2s7mxs47i3z7Ak2glDKXpnjqn12qOMsnFXRAFb0OcoSiG+KjlWVAdFjtT3l/F05OjI4rg+j8ArpxG/0tnE3sfpWDBXd/1aOxToy7yDiMhSNrqPiz22MLL7exeLrMDFwyoc9Q/q8BXzHZLgpOxy28KOCRTxeoElLmwJes3wI/lQTGNKw5v0TMFQsfoPMW8/0MgUv/N6ynp23yNG397i6X59WXmGcrvxUdYZphekYgK8qbNrur42tK17KAxnPEwRM3ai4yJyiUwd44/i5CdvyeUZP0YRJ/DrFB0aqqpmqAQ6z55Z5MSg0sgcGlgxyEIDLyW9zQgF2T9NZfr6UdNXrEn6rcxmcQlir0bECpuEUB7ue2PRSl7zq8h4za21mP0z+1lYMfxXp3R5xr/n6BO54u6Hc7D4ESWuk8UofmKmWVJ7onpFnLVm/FBnYGREu5FtGPQkpx52Vdi0DVikGnO+seHHmZNOP1Tapsn/TkEkeXdYuSnPuiJY5qfho8Mno41IXzceQGEl0Onc/f0NiAzBDQEmUZnrvFhUfbRR523OA9RkxWUI2XXjv5QdOzGOLx3UqbMluP+bCP7sGPo59L6Ffun8zHhNRXkNC2ly0cWzrGaDbORursq1pRjEEzRgTKOP8iAol3Btq1MFuG64Ze39qqyx6I549ZAdXOgyBcRBu3uniab/EY/QczGu/eIQNISnicvtQWU+ugQpyypSlnrvMAP9zvjmsEeQm7bcYMoe1NK2LAwtpXgM0f3zrjQ6cNbGDwp9uvIIA1QXczwvZ+fTme/cWe0bNIk2+sPYf6dhqab+M/M0jCq1KeCYfzpRbYQOGyfyrKyPvp7qyemAesRHvF58run8IPnA3v2jo2Kvg1JaYhF0VjoomLJnysyibPLjHSBRDqaZhHPVqkmYFmWgA70d8BR2NQKzmcPcKUnZxszPKIE2fbp4zLUM5ZhtmH+ACFCLKb6IHFU7go822MLzU9+qqmms7Fqte/sr6NTEyorXUZhBjm12yUr2pZEEsoRvWBNk/Wnj2d7wPZPhztbp+snrsbg7eu9+Kt2ln1I6yRQi8o/pI++fZbiXXBJPNGvD4EvZM9ShSjDoxmHKGeWBcwcqvR4vO6qhkkVK7QB82xMy/6krfS6Ha84ebQvnx5A2jwpmQX/gDk7PvDdLyZ/e3cmPhCDp2fQMwMKQ/YW9c72ux5G+S8nK1b+8HhyZeQ6k8rc/5rGGeqf4WfNb9mIaXhHNALSgcKqq5VX5PXx5jJ1a8vRu1qwVS/vM3RHiL4UrPuhvKMtx4/VdDNhhgJE/i8hbvZiQrtmakFh1y80OmCp+C7M2fFoM/d3LAYzTxJoCIFQn9RKA4DXeXV/rCJm0nSeNqX/PAvJ4IEJwW90WtZijsHExwcGLR5Adus34Upgsd2Qlc/ZNepbrUzXCrL8sdfnRiyvLocQG7s5eP+vzRAIkCKPbhj0aNi4UnT25mQlbUGhB0kayIY6SiPiHIEYLdsDisQJCLXc1dNc4mShWYRmgEKxipvMkLIi5RDRSxJl0YP0X9RtMo3TFdgiJ1Ug7IErxwp6MQtF3rGykMGPNU6wjixOimxravWg4iihKj/y47JaZpYUZb5woncXWRhFccxEkg2CHX4Dj6i6IP98HdY7Lb2ven+JJ7XH+dRuR1wmV4ZhLFvxSW1eXBxDD0lWSqaqfCt79sFCfaokWz1IqFkwtDPL02oXxeN8mzbfGgG9apRD9WK1jfV9DiIbGJJ4vy8qCtMjF8toJiTh226JE1xXfPY8w7OraMZDSiocDVETrpSTQENGE6hx/HH97RiTdqBQ5RpnLOQG5b6dteuEJHOnMJVWHn1FcYrJa5vAmaUyMbwcdmWIIHR/KUoS6nW5wHUy2o6vB4JuUNU/TIc14tY2UAGRtzWpugmpYdqWD858TOkZI6fo5evErVPOfvQ81H0THDx1E+gskraXTlxTYSxXBBMQBfLwwdSjEE7uEMyIgPPQWUS84MrNYq11TnC2I3q8J7aTPJ7oncEkoIfzPjsDVhUNPq7UmDtbpD0gzrr9G0jfT9vTz4eYCwUgxwon7czE48WYiFSndUAIvXfF4M6rbIJS2u0E9fnCNw4U1jiXTkJi+8pEwLhi4xM/Wt0e/LbjhOrLm4Q//ogl94n16C9Gv97CnwHdoqVQMSPHhQBTbffZH5SBO7YZkyIMw4QFamKCoR2IimPAlnB0T8g0Zb6r1XrHoHjcqzpyvJPcwEJdvb+gYA05pGj39Tdb4+H85HSLGJRj+gI7O+eTNF22vRd4YMMZJWS1zsggn5xI31cP27pOuijSAo0vSeFPDLpGTYsYTTkJpfRgcaFkRlQgjUnqGubOfr+X3LfoFiMwz5mF5Q6gTD2r0s28eQk5s/2Ef2/mqIE24yVN9rvo1Ys0xMNzlp+RKpNZLJd+rtoSnDiq3txqG7eXiieKnFoo/gKUu3cfk1FM/yWXVVe1HTIN5HpNmnAPOcx5yaq1kFhiCo5Q3LmRKbqqIKI539y8r4HwY1WYD9ZZalYEYZnd+ym6CNPVRsrai7Twt+aeLsyM39xTIoLXGhQiMsH+Bv+JxfaT6UwBdUq+QCY9rryr+T1PZ+pwFdcHczPTp3she1es3sCPpSGB2oPeD14sqvUyuoS9GcFZNdwtOILYGnkQSU8TaSqIvL24ZZ3MYDVT//Ff0hAeLT8aeAB92wnWC3qhdTwId+kvBVdH+w88iFzZ5YEt0seEGj1enatdECZ8hX8QPmdX8BkBAGuyvsyQUk1YCdjyfFfNDDikXfulCiJjx2MhxzrdvNojyMYxu4/WHSQDOYmSV4DICnxjoxPLvtnvb0pRm9LfgzNtFpn8gcMnZ0uXvd4v5wFd5nMdSm0y5Jj0zj4pfOOeOisTNyTGtfZLTYHbBLOnK2ix0sUjkGZYfCHe/CRY4UpDrLiI9D7i35cwLfQ9Q2KteGOvWUSDHVFi+FhVSISfYonLTnRQ+cx6nrWaSACfqPEhuShhLo/nyKovJF9huoyGrE0kZkG3UnN8+ulKS7chNKt1wgwg+wsPYl8sbathSeCJYqg5ZX9QPe+N3jYwtBHJA/W5o1sDCtWrW+T0EO8xoBABttDiI+Vv7hDTwocq3xJJFI6I0X+XLPjcmpwHfVP+F8FeqK8gkbh+LkXwDGplYlkavYKmCDOfRChc803XZ8pfyahHtr9rLgO2akSkzj1hBC1+D2OhD+mtvumPqrxCuNzMF4V4b+X/c+JYT+VBNtA+Bzc973ucnZOd4a3bd7E1PY+qdH82EDWUVGKn7Y3Ti6R11gN2F7NGzp30kW901ByX8h58TGGrB0TatiXVfQaP9x/oXJGtQrsXZj3KhiHxHflD4mAmlONP4xoI8TUTnIYjKGXWsV7Prc/t54KhNpqfee6wcQZz1tnttHIqtGgVlaTIMPc51ZyGMguPKRxnM4+xILwnOML4Z+GFWyx3DtWxjguX48Qnkv0bglzOXo04NmwqZPlAxxM92qgWlRvQG8Tptf+0Alcgig5ICrtLMJZwJaC5FfEGS3rxg++Eh4F9CdS7Ji0cRfZjmNZPScO/8CMvhQP0q+g0jMJDHinAWgNgvTwVRAUoE0hKaMzWLtD5u5sVjsxx+47lmZzsxXWJanfX6G+pvHHyrVFi6WGGsmcpIU2cqY1UhMPqJytc3x5bFoFHwmgdeY1u0579pFT/0OVziPlWi71BHnn/QlNqAVufmN+stvxj+bDv8aHATLPJ8ij16H3Ua0qnB6ycV0tTQIGN29XVkuHxKM8gcjqLsqQl6JMgOr8HV7zYrz+DlVb8u5Szb+gEieJmnxA1s8I8x1oiwznrFu+j2gHaijc2JGOFA5t+AOrhzz2IWtZm05ITx3U67LsDkM+/0zYYEWgRzMbS/onRaZyTVxw05sbe8ySEgqUIb2METJxDUYPp5MLCs8OoXgjCWX2GREQbABgLrKV0y+MVzCFQEjXDF8xT6/Qp4TKML4NCWhhWD5H3jWB7SckHThNCq0+qT7vCNfe4D32t1rd3TawHzD+o3/KH2qESUWwFL0DhBczKPzIvKelBg+2exwmEFVwtyCIdR3yZF6AAxAkKxUTs7Y7/5S/Zuz87qj+UGprloUm6sB5u7ulJOGZ1x3L05Gt463rhNuNu8IHV01XVEMdxRtO+jUWCM29OnKIPH38yz1rHAeeUfFHCpRId2LdRkRyw4d7CxadWosD+7EbKM3zFiqbTN3jR5nWW1O9oiaP1gOeNoCUAQeZvHV2yLdk95cgvLgtbno5vdpRWqg6AwfXuupxMpx4XLTaBjGfEmCOdcQ3aThwMioS3MxSuFL5xStcjg0XcxzCNd1Ct9XdHlUliIuqFtqfP5gGKlwHjz6A65rU9T5fNB4aKjPuEarVcgN/E=" };

  // sim-src/sim.ts
  var MICRO = 1e6;
  var b64d = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  async function decryptPaytable(passcode) {
    const km = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(passcode),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: b64d(paytable_enc_default.salt), iterations: 15e4, hash: "SHA-256" },
      km,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(paytable_enc_default.iv) }, key, b64d(paytable_enc_default.data));
    return JSON.parse(new TextDecoder().decode(plain));
  }
  var SimEngine = class {
    constructor(pt) {
      this.pt = pt;
      this.capMicro = pt.jackpotCapCoins * pt.microPerCoin;
      this.poolMicro = pt.seedCoins * pt.microPerCoin;
      this.contribMicro = pt.bet * pt.microPerCoin * pt.contributionRate.numerator / pt.contributionRate.denominator;
      this.cumFrom = pt.outcomes.map((o) => o.cumulativeFrom);
    }
    poolMicro;
    capMicro;
    contribMicro;
    cumFrom;
    /** CSPRNG 無偏差抽樣（rejection sampling；T < 2^31 << 2^32） */
    drawU() {
      const T = this.pt.totalWeight;
      const limit = Math.floor(4294967296 / T) * T;
      const buf = new Uint32Array(1);
      for (; ; ) {
        crypto.getRandomValues(buf);
        if (buf[0] < limit) return buf[0] % T;
      }
    }
    lookup(u) {
      let lo = 0;
      let hi = this.cumFrom.length - 1;
      while (lo < hi) {
        const mid = lo + hi + 1 >> 1;
        if (this.cumFrom[mid] <= u) lo = mid;
        else hi = mid - 1;
      }
      return this.pt.outcomes[lo];
    }
    /** 批次循序執行（INV-6 順序：扣款→提撥→抽→結算→入帳） */
    executeBatch(balance, n) {
      const bet = this.pt.bet;
      if (balance < bet * n) throw new WishError("insufficient", "\u91D1\u5E63\u4E0D\u8DB3");
      const spins = [];
      let totalCredit = 0;
      for (let i = 0; i < n; i++) {
        balance -= bet;
        this.poolMicro += this.contribMicro;
        if (this.poolMicro > this.capMicro) this.poolMicro = this.capMicro;
        const u = this.drawU();
        const o = this.lookup(u);
        let credit;
        if (o.type === "jackpot") {
          const r = o.poolRatio;
          credit = Math.floor(Math.floor(this.poolMicro * r.numerator / r.denominator) / MICRO);
          if (credit < 1) credit = 1;
          this.poolMicro -= credit * MICRO;
        } else {
          credit = o.payoutCoins;
        }
        balance += credit;
        totalCredit += credit;
        spins.push({
          index: i + 1,
          outcomeId: o.id,
          outcomeType: o.type,
          creditCoins: credit,
          poolAfterMicro: this.poolMicro
        });
      }
      return { balance, spins, totalCredit };
    }
  };
  var SimStats = class {
    startedAt = Date.now();
    activeMs = 0;
    lastInteraction = Date.now();
    lastTickAt = Date.now();
    clicks = [];
    // 點擊時間戳（許願鈕）
    spins = 0;
    batches = 0;
    skipSpins = 0;
    noSkipSpins = 0;
    betSum = 0;
    creditSum = 0;
    feel = { noPrize: 0, ldw: 0, breakEven: 0, realWin: 0, jackpot: 0 };
    constructor() {
      const touch = () => {
        this.lastInteraction = Date.now();
      };
      window.addEventListener("pointerdown", touch);
      window.addEventListener("keydown", touch);
      setInterval(() => {
        const now = Date.now();
        const dt = now - this.lastTickAt;
        this.lastTickAt = now;
        if (document.visibilityState === "visible" && now - this.lastInteraction < 6e4)
          this.activeMs += Math.min(dt, 15e3);
      }, 5e3);
    }
    recordBatch(bet, resp, skipOn) {
      this.batches++;
      this.clicks.push(Date.now());
      this.spins += resp.spins.length;
      this.betSum += resp.totalBetCoins;
      this.creditSum += resp.totalCreditCoins;
      for (const s of resp.spins) {
        if (skipOn) this.skipSpins++;
        else this.noSkipSpins++;
        if (s.outcomeType === "jackpot") this.feel.jackpot++;
        else if (s.creditCoins === 0) this.feel.noPrize++;
        else if (s.creditCoins < bet) this.feel.ldw++;
        else if (s.creditCoins === bet) this.feel.breakEven++;
        else this.feel.realWin++;
      }
    }
    export() {
      const activeMin = this.activeMs / 6e4;
      const intervals = [];
      for (let i = 1; i < this.clicks.length; i++) intervals.push(this.clicks[i] - this.clicks[i - 1]);
      intervals.sort((a, b) => a - b);
      const med = intervals.length ? intervals[Math.floor(intervals.length / 2)] : null;
      return {
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        durationMin: +((Date.now() - this.startedAt) / 6e4).toFixed(1),
        activeMin: +activeMin.toFixed(1),
        batches: this.batches,
        spins: this.spins,
        spinsPerActiveMin: activeMin > 0 ? +(this.spins / activeMin).toFixed(1) : null,
        skipSpins: this.skipSpins,
        noSkipSpins: this.noSkipSpins,
        clickIntervalMedianMs: med,
        betSum: this.betSum,
        creditSum: this.creditSum,
        deliveredPct: this.betSum > 0 ? +(this.creditSum / this.betSum * 100).toFixed(2) : null,
        feel: this.feel
      };
    }
  };
  var SimClient = class {
    // main 的 wish 呼叫帶 skipAnimation，記錄用
    constructor(engine, pt, stats) {
      this.engine = engine;
      this.pt = pt;
      this.stats = stats;
    }
    mode = "sim";
    balanceCoins = 1e4;
    seq = 0;
    skipOn = true;
    async wish(wishCount, multiplier, _s, skipAnimation) {
      const n = wishCount * multiplier;
      const r = this.engine.executeBatch(this.balanceCoins, n);
      this.balanceCoins = r.balance;
      const resp = {
        status: 0,
        batchId: `sim-${++this.seq}`,
        spins: r.spins,
        balanceCoins: this.balanceCoins,
        poolMicro: this.engine.poolMicro,
        totalBetCoins: this.pt.bet * n,
        totalCreditCoins: r.totalCredit
      };
      this.stats.recordBatch(this.pt.bet, resp, skipAnimation ?? false);
      return resp;
    }
    async pool() {
      return {
        poolMicro: this.engine.poolMicro,
        poolCoins: Math.floor(this.engine.poolMicro / MICRO),
        capCoins: this.pt.jackpotCapCoins,
        atCap: this.engine.poolMicro >= this.pt.jackpotCapCoins * MICRO,
        paytableVersion: `${this.pt.version}(sim)`
      };
    }
    async balance() {
      return this.balanceCoins;
    }
    async topUp(coins) {
      this.balanceCoins += coins;
      return this.balanceCoins;
    }
  };
  function mountStatsPanel(stats) {
    const btn = document.createElement("button");
    btn.textContent = "\u7D71\u8A08";
    btn.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:9999;background:#2a1206;color:#f5c542;border:1px solid #b8860b;border-radius:8px;padding:6px 12px;font-size:13px;opacity:.75";
    const panel = document.createElement("pre");
    panel.style.cssText = "position:fixed;left:8px;bottom:44px;z-index:9999;background:rgba(20,10,6,.95);color:#ffe9a8;border:1px solid #b8860b;border-radius:8px;padding:10px;font-size:11px;max-width:80vw;display:none;white-space:pre-wrap";
    btn.onclick = () => {
      const data = JSON.stringify(stats.export(), null, 2);
      panel.textContent = data + "\n\n\uFF08\u5DF2\u8907\u88FD\uFF0C\u8CBC\u7D66\u958B\u767C\u56DE\u6536\uFF09";
      panel.style.display = panel.style.display === "none" ? "block" : "none";
      void navigator.clipboard?.writeText(data).catch(() => {
      });
    };
    document.body.appendChild(btn);
    document.body.appendChild(panel);
  }
  window.__SIM_FACTORY = async () => {
    const fromHash = new URLSearchParams(location.hash.slice(1)).get("key");
    const tryBuild = async (passcode) => {
      const pt = await decryptPaytable(passcode);
      const stats = new SimStats();
      mountStatsPanel(stats);
      return new SimClient(new SimEngine(pt), pt, stats);
    };
    if (fromHash) {
      try {
        return await tryBuild(fromHash);
      } catch {
      }
    }
    for (; ; ) {
      const passcode = prompt("\u5167\u6E2C\u901A\u884C\u78BC\uFF1A") ?? "";
      try {
        return await tryBuild(passcode);
      } catch {
        alert("\u901A\u884C\u78BC\u4E0D\u6B63\u78BA\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21");
      }
    }
  };
})();
