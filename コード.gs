/**
 * ウェブアプリを表示する
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('AI数学小テスト')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * スプレッドシートから問題リストを取得する
 */
function getQuestions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('問題リスト');
  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // ヘッダーを削除
  
  // オブジェクトの配列に変換
  return data.map(row => {
    let obj = {};
    headers.forEach((header, i) => obj[header] = row[i]);
    return obj;
  });
}

/**
 * 解答を保存し、AIで採点する (仮の枠組み)
 * ※Gemini API連携は次のステップで実装します
 */
function submitAnswer(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ss.getSheetByName('解答ログ');
  
  // 本来はここでGemini APIを呼び出しますが、
  // まずは通信と保存が正常に動くか確認するため「採点中」として保存します。
  
  const timestamp = new Date();
  const row = [
    timestamp,
    payload.studentClass,
    payload.studentNumber,
    payload.questionId,
    "画像データ受信済み", // 後でDriveのURLにする
    "未採点",
    "通信テスト成功。次にGemini APIを接続します。"
  ];
  
  logSheet.appendRow(row);
  
  return {
    status: "success",
    feedback: "解答を送信しました。スプレッドシートを確認してください。"
  };
}
