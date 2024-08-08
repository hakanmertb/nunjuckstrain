import 'package:flutter/material.dart';
import 'package:app/product.service.dart';

class ProductListView extends StatefulWidget {
  const ProductListView({super.key});
  @override
  State<ProductListView> createState() => _ProductListViewState();
}

class _ProductListViewState extends State<ProductListView> {
  final ProductService _service = ProductService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Product List')),
      body: FutureBuilder(
          future: _service.getAll(),
          builder: (context, snapshot) {
           if (!snapshot.hasData || snapshot.data == null) {
              return const Center(child:CircularProgressIndicator());
            }
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                final product = snapshot.data![index];
                return ListTile(
                  title: Text(product.name),
                  trailing: Text(product.price.toString()),
                  // Diğer özellikler buraya eklenebilir
                );
              },
            );
          }),
    );
  }
}

