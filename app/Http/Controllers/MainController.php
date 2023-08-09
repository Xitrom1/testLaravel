<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function ShowPageHome()
    {
        return view('home', ['title' => 'Home']);
    }

    public function ShowPage($titleName)
    {
        return view($titleName, ['title' => $titleName]);
    }
}
