package br.com.cbtech.atlas.exceptions;

public class RegisterNotFoundException extends RuntimeException {

    public RegisterNotFoundException(String e) {
        super("Register not found:" + e);
    }
}

