import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:app/product.model.dart';

class ProductService {
  final String baseUrl = 'http://10.0.2.2:3000';

  Future<List<Product>> getAll() async {
    final response = await http.get(Uri.parse('$baseUrl/products'));
    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((data) => Product.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load products');
    }
  }

  Future<Product> getById(String id) async {
    final response = await http.get(Uri.parse('$baseUrl/products/$id'));
    if (response.statusCode == 200) {
      return Product.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load product');
    }
  }

  // Diğer CRUD operasyonları buraya eklenebilir
}
