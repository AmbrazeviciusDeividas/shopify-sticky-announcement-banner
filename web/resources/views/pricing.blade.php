@section('content')
    <div class="container">
        <h1 class="text-center">Pricing</h1>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3>Free Plan</h3>
                    </div>
                    <div class="card-body">
                        <p>Basic features of the app.</p>
                    </div>
                    <div class="card-footer">
                        @if(auth()->user()->plan === 'free')
                            <button class="btn btn-primary" disabled>Current Plan</button>
                        @else
                            <a href="{{ route('subscribe', 'free') }}" class="btn btn-primary">Switch to Free Plan</a>
                        @endif
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3>Premium Plan</h3>
                    </div>
                    <div class="card-body">
                        <p>Advanced features and premium support.</p>
                    </div>
                    <div class="card-footer">
                        @if(auth()->user()->plan === 'premium')
                            <button class="btn btn-primary" disabled>Current Plan</button>
                        @else
                            <a href="{{ route('subscribe', 'premium') }}" class="btn btn-primary">Upgrade to Premium</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
