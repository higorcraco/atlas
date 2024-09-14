package br.com.cbtech.atlas.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "task")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Long position;
    @Size(max = 150)
    @NotEmpty
    @NotBlank
    private String description;
    private Boolean completed = Boolean.FALSE;
}
