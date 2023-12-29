<?php

// Проверяем, что запрос является POST-запросом
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Получаем данные из тела запроса
    $data = file_get_contents('php://input');

    // Декодируем JSON-данные в ассоциативный массив
    $decodedData = json_decode($data, true);

    // Проверяем успешность декодирования JSON
    if (json_last_error() === JSON_ERROR_NONE) {

        // Генерируем имя файла (можно сделать более сложную логику)
        $filename = 'sketch_' . date('YmdHis') . '.json';

        // Путь для сохранения файла
        $filePath = __DIR__ . '/sketches/' . $filename;

        // Сохраняем данные в JSON-файл
        file_put_contents($filePath, json_encode($decodedData));

        // Отправляем ответ об успешном сохранении
        echo json_encode(['status' => 'success', 'message' => 'Sketch saved successfully.', 'filename' => $filename]);
    } else {
        // Отправляем ответ об ошибке при декодировании JSON
        echo json_encode(['status' => 'error', 'message' => 'Failed to decode JSON.']);
    }
} else {
    // Отправляем ответ о неправильном методе запроса
    echo json_encode(['status' => 'error', 'message' => 'Only POST requests are allowed.']);
}
