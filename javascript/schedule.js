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
            // CSVテキストを行ごとに分割
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

                // HTMLの組み立て
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
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('schedule-list').innerHTML = '<tr><td colspan="2">スケジュールの読み込みに失敗しました。</td></tr>';
        });
}
