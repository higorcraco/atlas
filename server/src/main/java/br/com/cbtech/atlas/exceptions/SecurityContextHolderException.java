package br.com.cbtech.atlas.exceptions;

public class SecurityContextHolderException extends RuntimeException {

    public SecurityContextHolderException(String e) {
        super("SecurityContextHolderException:" + e);
    }
}
