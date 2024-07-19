package mock.auction.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseObject {
    private int status;
    private String message;
    private Object data;
}
