package mock.auction.model.category;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
public class CategoryDto {
    private Integer id;

    @NotBlank(message = "Name is required")
    private String name;

    private String description;
}
