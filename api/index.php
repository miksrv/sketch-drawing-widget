<?php

// For local run: php -S localhost:8000

// Устанавливаем заголовки для разрешения CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Замените на ваш домен, если он отличается
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Добавьте другие методы, если необходимо
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Устанавливаем заголовок ответа как JSON
header('Content-Type: application/json');

// Если запрос является OPTIONS, просто возвращаем 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

const SKETCH_DIR = __DIR__ . '/data/';

function getJsonFiles() {
    if (!$dirHandle = opendir(SKETCH_DIR)) {
        return false;
    }

    $result = [];

    // Открываем директорию
    $dirHandle = opendir(SKETCH_DIR);

    // Читаем каждый элемент в директории
    while (($file = readdir($dirHandle)) !== false) {
        // Проверяем, что это JSON-файл
        if (pathinfo($file, PATHINFO_EXTENSION) == 'json') {
            // Полный путь к файлу
            $filePath = SKETCH_DIR . '/' . $file;

            // Читаем содержимое файла
            $fileContent = file_get_contents($filePath);

            // Декодируем JSON
            $jsonData = json_decode($fileContent, true);

            // Проверяем успешность декодирования и наличие параметра
            if (json_last_error() === JSON_ERROR_NONE && !empty($jsonData)) {
                $result[] = $jsonData;
            }
        }
    }

    // Закрываем дескриптор директории
    closedir($dirHandle);

    return $result;
}

function handleRequest() {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Проверяем, существует ли директория
            if (!is_dir(SKETCH_DIR)) {
                mkdir(SKETCH_DIR, 0777, true);
            }

            // Обработка GET-запроса
            echo json_encode(['items' => getJsonFiles()]);
            break;

        case 'POST':
            // Обработка POST-запроса
            $data = file_get_contents('php://input');
            $decodedData = (object) json_decode($data, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                if (!file_exists(SKETCH_DIR)) {
                    mkdir(SKETCH_DIR, 0777, true);
                }

                $decodedData->id = uniqid();

                if ($decodedData->image) {
                    // Удаление метаданных из строки base64, если они присутствуют
                    $base64_string = preg_replace('/^data:image\/\w+;base64,/', '', $decodedData->image);
                    // Декодирование base64 в бинарные данные
                    $decoded_image = base64_decode($base64_string);
                    // Сохранение изображения на сервере
                    file_put_contents(SKETCH_DIR . $decodedData->id . '.png', $decoded_image);
                }

                file_put_contents(SKETCH_DIR . $decodedData->id . '.json', json_encode($decodedData));

                echo json_encode(['status' => 'success', 'message' => 'Sketch saved successfully.', 'id' => $decodedData->id]);
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
            // Получаем текущий URL
            $currentUrl = $_SERVER['REQUEST_URI'];

            // Разбиваем URL по слешу и получаем последний элемент
            $parts = explode('/', $currentUrl);
            $id = end($parts);  // Получаем последний элемент массива

            if (!$id) {
                echo json_encode(['status' => 'error', 'message' => 'ID is missing']);
                break;
            }

            // Имя файла, который вы хотите удалить
            $filenameToDelete = $id . '.json';  // Замените на имя вашего файла

            // Полный путь к файлу
            $filePath = SKETCH_DIR . $filenameToDelete;

            // Проверяем, существует ли файл
            if (file_exists($filePath)) {
                if (unlink($filePath) && unlink(SKETCH_DIR . $id . '.png')) {
                    echo json_encode(['status' => 'success', 'message' => 'Sketch was removed']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Sketch remove error']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Sketch not found']);
            }

            break;

        default:
            // Если метод не известен
            echo json_encode(['status' => 'error', 'message' => 'Unknown request method.']);
            break;
    }
}

// Вызываем функцию для обработки запроса
handleRequest();
