class Product {
  
  String name;
  
  double price;
  
  String description;
  

  Product({
    
    required this.name,
    
    required this.price,
    
    required this.description,
    
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      
      name: json['name'],
      
      price: json['price'],
      
      description: json['description'],
      
    );
  }

  Map<String, dynamic> toJson() {
    return {
      
      'name': name,
      
      'price': price,
      
      'description': description,
      
    };
  }
}
