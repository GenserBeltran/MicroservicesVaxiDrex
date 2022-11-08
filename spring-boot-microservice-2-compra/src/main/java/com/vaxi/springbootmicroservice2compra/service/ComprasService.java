package com.vaxi.springbootmicroservice2compra.service;

import com.vaxi.springbootmicroservice2compra.model.Compra;

import java.util.List;

public interface ComprasService {
    Compra saveCompra(Compra compra);

    List<Compra> findAllComprasOfUser(Long userId);
}
