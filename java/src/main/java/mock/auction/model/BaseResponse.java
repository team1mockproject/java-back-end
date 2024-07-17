package mock.auction.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class BaseResponse {
    private Integer code;
    private String message;
    private Object data;

    public BaseResponse(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
