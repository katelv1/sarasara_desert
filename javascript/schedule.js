// ▼▼▼ スケジュール読み込み機能 出演情報▼▼▼

    // ページが読み込まれたら実行
    document.addEventListener("DOMContentLoaded", function() {
        // schedule.htmlを開いている時だけ実行する判定
        if (document.getElementById("schedule-list")) {
            loadSchedule();
        }
    });

    function loadSchedule() {
        // CSVファイルの場所
        const csvFilePath = 'csv/schedule.csv';

        fetch(csvFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('CSVファイルが見つかりません');
                }
                return response.text();
            })
            .then(data => {
                // CSVテキストを行ごとに分割（改行コードで区切る）
                const rows = data.trim().split('\n');
                // CSVを逆順に読み込み
                rows.reverse();

                let htmlContent = '';

                // 各行をループ処理
                rows.forEach(row => {
                    // カンマで分割して配列にする [日付, タグ, タイトル, 状態, 備考]
                    const cols = row.split(',');

                    // データが足りない行はスキップ
                    if (cols.length < 4) return;

                    const date = cols[0];
                    const tag = cols[1];
                    const title = cols[2];
                    const status = cols[3] ? cols[3].trim() : '';
                    const note =cols[4];

                    // HTMLを組み立てる
                    htmlContent += `
                        <tr>
                            <th>
                                ${date}<br>
                                <span class="schedule-tag">${tag}</span>
                            </th>
                            <td>
                                <strong>${title}</strong><br>
                                <span class="note">${note}</span><br>
                                <span class="status-text" style="color:${status === '終了' ? '#999' : '#d35400'}">
                                    ${status}
                                </span>
                            </td>
                        </tr>
                    `;
                });

                // テーブルの中身を書き換える
                const listElement = document.getElementById('schedule-list');
                listElement.innerHTML = htmlContent;

                adjustTableHeight()
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('schedule-list').innerHTML = '<tr><td colspan="2">スケジュールの読み込みに失敗しました。</td></tr>';
            });
    }

    // 5行分の高さを計算して設定する関数
    function adjustTableHeight() {
        const table = document.querySelector('.schedule-table');
        const container = document.getElementById('table-container');
        const rows = table.querySelectorAll('tbody tr'); // 行の要素を取得
        const header = table.querySelector('thead');     // ヘッダーを取得

        // データが5件以上ある場合のみ高さ制限をする
        if (rows.length > 0) {
            // 1行目の高さを測る
            const rowHeight = rows[0].offsetHeight;
            // ヘッダーの高さを測る
            const headerHeight = header.offsetHeight;
            
            // 表示したい行数
            const visibleRows = 3.5;

            // 計算：ヘッダーの高さ + (1行の高さ × 5)
            // ※少し余裕を持たせないとスクロールバーが邪魔で5行目が見切れることがあるので +5px しています
            const optimalHeight = headerHeight + (rowHeight * visibleRows) + 5;

            // コンテナの高さ（max-height）を設定
            container.style.maxHeight = optimalHeight + 'px';
        }
    }

// スケジュール読み込み機能 出演情報