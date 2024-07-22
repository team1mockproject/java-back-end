<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    protected $table = 'auction'; // Tên bảng chính xác trong cơ sở dữ liệu

    public $timestamps = false;
    protected $primaryKey = 'auction_id';
    protected $fillable = [
        'start_date', 'end_date', 'conductor', 'asset_id', 'starting_price', 
        'min_price_increase', 'period', 'auction_type_id', 'winner_id', 'highest_price',
        'auction_status', 'auction_event_id', 'payment_status', 'payment_date', 
        'payment_amount', 'payment_method', 'del_flag'
    ];

    public function participants()
    {
        return $this->belongsToMany(Account::class, 'registparticipateauction', 'auction_id', 'account_id')
                    ->withPivot('payment', 'amount');
    }
}
