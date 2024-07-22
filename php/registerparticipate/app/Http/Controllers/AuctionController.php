<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auction;
use App\Models\Account;
use App\Models\RegistParticipateAuction;
use Illuminate\Support\Facades\Validator;

class AuctionController extends Controller
{
    public function registerToParticipate(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'auction_id' => 'required|exists:auction,auction_id',
            'account_id' => 'required|exists:account,account_id',
            'payment' => 'required|string',
            'amount' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Check if the auction is active
        // $auction = Auction::find($request->auction_id);
        // if (!$auction || $auction->auctionStatus != 'đang diễn ra') {
        //     return response()->json(['error' => 'Auction is not active'], 400);
        // }

        // Register the participation
        $registration = new RegistParticipateAuction();
        $registration->auction_id = $request->auction_id;
        $registration->account_id = $request->account_id;
        $registration->payment = $request->payment;
        $registration->amount = $request->amount;
        $registration->save();

        return response()->json(['message' => 'Registered successfully',
                                'data'=> $registration], 201);
    }
    public function accept($auction_id, $account_id)
{
    $registration = RegistParticipateAuction::where('auction_id', $auction_id)
                                             ->where('account_id', $account_id)
                                             ->first();

    if (!$registration) {
        return response()->json(['error' => 'Registration not found.'], 404);
    }

    $registration->update(['status' => 'accepted']);

    return response()->json([
        'message' => 'Participant accepted successfully.',
        'data' => $registration
    ]);
}

public function reject($auction_id, $account_id)
{
    $registration = RegistParticipateAuction::where('auction_id', $auction_id)
                                             ->where('account_id', $account_id)
                                             ->first();

    if (!$registration) {
        return response()->json(['error' => 'Registration not found.'], 404);
    }

    $registration->update(['status' => 'rejected']);

    return response()->json([
        'message' => 'Participant rejected successfully.',
        'data' => $registration
    ]);
}

}
