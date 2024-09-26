package com.sharforaz.storeManagement.controllers;


import com.sharforaz.storeManagement.models.product;
import com.sharforaz.storeManagement.services.productDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/products")
public class productsController {

    @Autowired
    private productDb db;

    //Showing all products;
    @GetMapping("/show")
    public List<product> showProduct(){
        return db.findAll();
    }

    //Adding Product
    @PostMapping()
    public ResponseEntity<Void> addProduct(@RequestBody product product){
        try {
            db.save(product);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Delete Product by ID;
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id){
        try {
            db.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Finding Element by Brand Name;
    @GetMapping("/{brand}")
    public ResponseEntity<List<product>> showByBrand(@PathVariable String brand){
        try {
            List<product> list = db.findByBrand(brand);
            return ResponseEntity.status(HttpStatus.OK).body(list);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Update a product by ID
    @PutMapping("/{id}")
    public ResponseEntity<product> updateProduct(@PathVariable int id,@RequestBody product updateProduct){
        try{
            if(!db.existsById(id)){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            updateProduct.setId(id);
            db.save(updateProduct);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Search price within a certain range
    public ResponseEntity<List<product>> searchPriceInRange(int minPrice, int maxPrice){
        List<product> list = db.findAll();
        for(product product : list){
            if(product.getPrice() >= minPrice && product.getPrice() <= maxPrice){
                list.add(product);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    //Sort the price from lowest to highest
    public ResponseEntity<List<product>> sortPriceRange(){
        List<product> list = db.findAll();
        list.sort(new Comparator<product>() {
            @Override
            public int compare(product p1, product p2) {
                return p2.getPrice() - p1.getPrice();
            }
        });
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    // Pagination
}


