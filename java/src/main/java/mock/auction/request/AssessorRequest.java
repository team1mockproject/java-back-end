package mock.auction.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssessorRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Province is required")
    private String province;
    @NotBlank(message = "City is required")
    private String city;
    private String address;
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Phone is required")
    private String phone;
}
