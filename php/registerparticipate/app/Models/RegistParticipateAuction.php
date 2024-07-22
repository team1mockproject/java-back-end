<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistParticipateAuction extends Model
{
    use HasFactory;

    protected $table = 'registparticipateauction'; // Tên bảng chính xác trong cơ sở dữ liệu
    protected $primaryKey = null; // Không có khóa chính tự động tăng trong bảng này
    public $timestamps = false;
    public $incrementing = false; // Không sử dụng auto-increment cho khóa chính

    protected $fillable = [
        'auction_id',
        'account_id',
        'payment',
        'amount',
        'status'
    ];

    // Các logic thêm vào nếu cần
}
