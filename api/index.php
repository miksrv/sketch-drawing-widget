<?php

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
                $filename = 'sketch_' . date('YmdHis') . '.json';
                $filePath = __DIR__ . '/sketches/' . $filename;
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
