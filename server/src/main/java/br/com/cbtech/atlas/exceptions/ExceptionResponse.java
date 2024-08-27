package br.com.cbtech.atlas.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class ExceptionResponse implements Serializable {

    private LocalDate timestamp;
    private String message;
    private String details;
}
