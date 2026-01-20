document.addEventListener("DOMContentLoaded", function() {
    
    //index.html のニュース更新
    const newsListElement = document.querySelector('.news-list');
    
    // ページ内に「.news-list」がある場合だけ実行
    if (newsListElement) {
        fetch('csv/schedule.csv')
            .then(response => {
                if (!response.ok) throw new Error('CSVファイルが見つかりません');
                return response.text();
            })
            .then(data => {
                // CSVを行ごとに分割
                let rows = data.trim().split('\n');
                
                // 新しい日付順にするために逆転
                rows.reverse();

                // 既存のニュースをクリア
                newsListElement.innerHTML = '';

                let htmlContent = '';

                rows.forEach(row => {
                    const cols = row.split(',');
                    // データ不足の行はスキップ
                    if (cols.length < 4) return;

                    const date = cols[0];   // 日付
                    const title = cols[2];  // タイトル
                    const status = cols[3].trim(); // ステータス

                    //　status=終了となっているものだけを表示
                    if (status === '終了') {
                        htmlContent += `
                            <dt>${date}</dt>
                            <dd>${title} 無事終了しました！</dd>
                        `;
                    }
                });

                // HTMLに反映
                newsListElement.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('News Error:', error);
                newsListElement.innerHTML = '<dt>お知らせ</dt><dd>ニュースの読み込みに失敗しました。</dd>';
            });
    }
});



