const PAYJP_KEY = gon.payjp_key; // 環境変数の定義

// pay_wayのページで入力したカード情報を使用してPAY.JPからトークン取得
document.addEventListener( 
  "DOMContentLoaded", e => {
    if (document.getElementById("token_submit") != null) {
      Payjp.setPublicKey(PAYJP_KEY);
      let btn = document.getElementById("token_submit"); 
      btn.addEventListener("click", e => { 
        e.preventDefault(); 
        let card = {
          number: document.getElementById("card_number").value,
          cvc: document.getElementById("cvc").value,
          exp_month: document.getElementById("exp_month").value,
          exp_year: document.getElementById("exp_year").value
        }; 
        Payjp.createToken(card, (status, response) => {
          if (status === 200) { 
            $("#card_number").removeAttr("name");
            $("#cvc").removeAttr("name");
            $("#exp_month").removeAttr("name");
            $("#exp_year").removeAttr("name");
            $("#card_token").append(
              $('<input type="hidden" name="payjp-token">').val(response.id)
            );
            document.inputForm.submit()
          } else {
            alert("カード情報が正しくありません。");
          }
        });
      });
    }
  },
  false
);