package com.sharforaz.storeManagement.services;

import com.sharforaz.storeManagement.models.product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface productDb extends JpaRepository<product, Integer> {
    List<product> findByBrand(String brand);
}
