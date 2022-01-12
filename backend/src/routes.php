<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use App\Models\Users;
use App\Models\Encounters;
use App\Models\Matches;
use App\Models\Pictures;
use App\Models\Token;
use Slim\Routing\RouteCollectorProxy;

return function(App $app){

    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
    
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000') // vagy '*'
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });
    
    $app->get('/', function (Request $request, Response $response, $args) {
        $output = json_encode(['error'=>'Nincs jogosultságod az oldal megtekintéséhez.']);
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(401);
    });
    
    $app->get('/app/users', function (Request $request, Response $response, $args) {
        $users = Users::Join('pictures','pictures.user_id','=','users.user_id')
        ->select('users.user_id','users.user_name','users.user_age','users.user_description',Users::raw("GROUP_CONCAT(pictures.picture_name SEPARATOR ',') AS picture_name"))
        ->groupBy('users.user_id')
        ->get();
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
    
    $app->get('/app/pictures', function (Request $request, Response $response, $args) {
        $users = Pictures::all();
        $output = $users->toJson();
        $response->getBody()->write($output);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    });
    
    $app->get('/app/pictures/{user_id}', function (Request $request, Response $response, $args) {
        if(!is_numeric($args['user_id']) || $args['user_id'] <= 0){
            $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
            $response->getBody()->write($output);
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(400);
        }
    
        $pictures = Pictures::where('user_id', $args['user_id'])->get();
    
        if($pictures === NULL){
            $output = json_encode(['error'=>'Nincs ilyen ID-val felhasználó!']);
            $response->getBody()->write($output);
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        }
    
        $response->getBody()->write($pictures->toJson());
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    });
    
    $app->post('/app/pictures', function (Request $request, Response $response, $args) {
        $data = json_decode($request->getBody(), true);
        $users = Pictures::Create($data);
        $users->save();
        $response->getBody()->write($users->toJson());
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(201);
    });
    
    $app->delete('/app/pictures/{picture_id}', function (Request $request, Response $response, $args) {
        if(!is_numeric($args['picture_id']) || $args['picture_id'] <= 0){
            $output = json_encode(['error'=>'Az ID-nek pozitív egész számnak kell lennie!']);
            $response->getBody()->write($output);
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(400);
        }
    
        $users = Pictures::find($args['picture_id']);
        if($users === NULL){
            $output = json_encode(['error'=>'Nincs ilyen ID-val kép!']);
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

};