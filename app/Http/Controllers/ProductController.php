<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();

        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }
    public function store(Request $request){
        $product = Product::create($request->all());

        return response()->json([
            'status' => 'success',
            'product' => $product
        ]);
    }

    public function show(Product $product){
        $product = Product::find($product)->first();

        return response()->json([
            'status' => 'success',
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product){
        $product = $product->update($request->all());

        return response()->json([
            'status' => 'success',
            'product' => $product
        ]);
    }

    public function destroy(Product $product){
        $product = $product->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
