package br.com.cbtech.atlas.converter;

public interface DTOConverter<E, D> {

    D to(E entity);
}
