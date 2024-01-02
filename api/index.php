<?php

// For local run: php -S localhost:8000

// Устанавливаем заголовки для разрешения CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Замените на ваш домен, если он отличается
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Добавьте другие методы, если необходимо
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Если запрос является OPTIONS, просто возвращаем 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

function handleRequest() {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Обработка GET-запроса
            echo json_encode(['status' => 'success', 'message' => 'GET request handled.']);
            break;

        case 'POST':
            // Обработка POST-запроса
            $data = file_get_contents('php://input');
            $decodedData = json_decode($data, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                $directory = __DIR__ . '/data/';

                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true);
                }

                $filename = 'sketch_' . date('YmdHis') . '.json';
                $filePath = $directory . $filename;

                file_put_contents($filePath, json_encode($decodedData));

                echo json_encode(['status' => 'success', 'message' => 'Sketch saved successfully.', 'filename' => $filename]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to decode JSON.']);
            }
            break;

        case 'PUT':
            // Обработка PUT-запроса
            parse_str(file_get_contents("php://input"), $putParams);
            echo json_encode(['status' => 'success', 'message' => 'PUT request handled.', 'data' => $putParams]);
            break;

        case 'DELETE':
            // Обработка DELETE-запроса
            echo json_encode(['status' => 'success', 'message' => 'DELETE request handled.']);
            break;

        default:
            // Если метод не известен
            echo json_encode(['status' => 'error', 'message' => 'Unknown request method.']);
            break;
    }
}

// Вызываем функцию для обработки запроса
handleRequest();
