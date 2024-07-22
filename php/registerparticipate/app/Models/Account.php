<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $table = 'account'; // Tên bảng chính xác trong cơ sở dữ liệu
    protected $primaryKey = 'account_id'; // Khai báo khóa chính nếu cần thiết
    public $timestamps = false;

    protected $fillable = [
        'is_personal_or_agency',
        'email',
        'password',
        'fullname',
        'phone',
        'gender',
        'age',
        'location_id',
        'career',
        'count_spam',
        'status',
        'del_flag'
    ];

    // Các logic thêm vào nếu cần
}
