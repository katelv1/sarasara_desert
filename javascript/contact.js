document.addEventListener("DOMContentLoaded", function() {

    // ▼▼▼ お問い合わせフォーム送信機能 ▼▼▼
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // 1. 実際の送信（画面遷移）をキャンセルする
            event.preventDefault();

            // 2. 入力内容を取得（必要であれば使用）
            const name = document.getElementById('name').value;

            // 3. 送信完了メッセージを表示
            // 実際はここでサーバーにデータを送りますが、今回は擬似的にアラートを出します
            alert(name + " 様\n\nお問い合わせありがとうございます。\nメッセージを送信しました。（※デモ動作です）");

            // 4. フォームの中身を空にする
            contactForm.reset();
        });
    }
});