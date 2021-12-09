<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Illuminate\Database\Capsule\Manager;
use App\Models\Users;
use App\Models\Encounters;
use App\Models\Matches;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$config = require __DIR__ . '/src/config.php';

$dbManager = new Manager();
$dbManager->addConnection([
'driver' => 'mysql',
'host' => $config['DB_HOST'],
'database' => $config['DB_DATABASE'],
'username' => $config['DB_USER'],
'password' => $config['DB_PASS'],
'charset' => 'utf8mb4',
'collation' => 'utf8mb4_unicode_ci',
'prefix' => '',
]);

$dbManager->setAsGlobal();
$dbManager->bootEloquent();

$app->setBasePath('/zepheer/backend');

$app->get('/', function (Request $request, Response $response, $args) {
    $output = json_encode(['error'=>'Nincs jogosultságod az oldal megtekintéséhez.']);
    $response->getBody()->write($output);
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(401);
});

$app->get('/app/users', function (Request $request, Response $response, $args) {
    $users = Users::all();
    $output = $users->toJson();
    $response->getBody()->write($output);
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->get('/app/users/{user_id}', function (Request $request, Response $response, $args) {
    if(!is_numeric($args['user_id']) || $args['user_id'] <= 0){
        $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    $users = Users::find($args['user_id']);
    if($users === NULL){
        $output = json_encode(['error'=>'Nincs ilyen ID-val felhasználó!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }

    $response->getBody()->write($users->toJson());
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->post('/app/users', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody(), true);
    $users = Users::Create($data);
    $users->save();
    $response->getBody()->write($users->toJson());
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
});

$app->delete('/app/users/{user_id}', function (Request $request, Response $response, $args) {
    if(!is_numeric($args['user_id']) || $args['user_id'] <= 0){
        $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    $users = Users::find($args['user_id']);
    if($users === NULL){
        $output = json_encode(['error'=>'Nincs ilyen ID-val felhasználó!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }

    $users->delete();
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(204);
});

$app->put('/app/users/{user_id}', function (Request $request, Response $response, $args) {
    if(!is_numeric($args['user_id']) || $args['user_id'] <= 0){
        $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    $users = Users::find($args['user_id']);
    if($users === NULL){
        $output = json_encode(['error'=>'Nincs ilyen ID-val felhasználó!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }
    $data = json_decode($request->getBody(), true);
    $users->fill($data);
    $users->save();
    $response->getBody()->write($users->toJson());
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(204);
});

$app->get('/app/encounters', function (Request $request, Response $response, $args) {
    $users = Encounters::all();
    $output = $users->toJson();
    $response->getBody()->write($output);
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->get('/app/encounters/{user_id}', function (Request $request, Response $response, $args) {
    if(!is_numeric($args['user_id']) || $args['user_id'] <= 0){
        $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    $users = Encounters::find($args['user_id']);

    if($users === NULL){
        $output = json_encode(['error'=>'Nincs ilyen ID-val felhasználó!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }

    $users = Encounters::where("user_id_rated", "=", $args['user_id'])->where("rating", "=", 1)->get();

    $response->getBody()->write($users->toJson());
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->post('/app/encounters', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody(), true);
    $users = Encounters::Create($data);
    $users->save();
    $response->getBody()->write($users->toJson());
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
});

$app->get('/app/matches', function (Request $request, Response $response, $args) {
    $users = Matches::all();
    $output = $users->toJson();
    $response->getBody()->write($output);
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->get('/app/matches/{user_id}', function (Request $request, Response $response, $args) {
    if(!is_numeric($args['user_id']) || $args['user_id'] <= 0){
        $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    $users = Users::find($args['user_id']);

    if($users === NULL){
        $output = json_encode(['error'=>'Nincs ilyen ID-val felhasználó!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }

    $users = Matches::where("user_id", "=", $args['user_id'])->orWhere("user_id_matched", "=", $args['user_id'])->get();

    $response->getBody()->write($users->toJson());
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->post('/app/matches', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody(), true);
    $users = Matches::Create($data);
    $users->save();
    $response->getBody()->write($users->toJson());
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
});

$app->delete('/app/matches/{match_id}', function (Request $request, Response $response, $args) {
    if(!is_numeric($args['match_id']) || $args['match_id'] <= 0){
        $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    $users = Matches::find($args['match_id']);
    if($users === NULL){
        $output = json_encode(['error'=>'Nincs ilyen ID-val kapcsolat!']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }

    $users->delete();
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(204);
});

$app->run();