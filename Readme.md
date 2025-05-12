# Photon Sniper Bot

A high-performance Solana token sniper bot that leverages Jito's MEV infrastructure for optimal execution. This bot is specifically designed to interact with the Photon protocol on Solana, providing fast and efficient token purchases.

## Support

For support and inquiries, contact:
- Telegram: [@cashblaze127](https://t.me/cashblaze127)

## Related Links
Jito Bundler
https://explorer.jito.wtf/bundle/580a4cc6db4ed65098b44bc4ad07e1cbed36b89f2299d9db853fa0036259709b

Transaction
https://solscan.io/tx/2aNhwGPdReMCbccLeBEMshZDGqSRuYA7ZTGToNaT8LWAVubrgfjrMzmNKf9FyxrK6qVFEUFtRQhh8wR1qbC9ZzPk


## Features

- 🚀 Jito MEV Integration for optimal transaction execution
- 💰 Multi-wallet support with priority-based execution
- ⚡ Parallel transaction processing
- 🔄 Automatic retry mechanism for failed transactions
- 💎 Support for Photon protocol swaps
- 🛡️ Slippage protection
- 📊 Price impact calculation
- 🔐 Secure wallet management

## Prerequisites

- Node.js (20.18.0 or higher)
- Solana CLI tools
- A Solana wallet with sufficient SOL
- Jito access (for MEV capabilities)

## Installation

1. Clone the repository:
```bash
git clone git@github.com:cashblaze127/jito-photon-sniper.git
cd jito-photon-sniper
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following configuration:
```env
SOLANA_RPC=https://api.mainnet-beta.solana.com
IS_DEVNET=false
SLIPPAGE_BPS=10
JITO_TIP_MULT=20
WALLETS_FILE=wallets.txt
PRIORITY_FEE=2000
```

4. Create a `wallets.txt` file with your wallet information in the following format:
```
<public_key>,<private_key>,<amount_in_sol>
```

## Configuration

### Environment Variables

- `SOLANA_RPC`: Your Solana RPC endpoint
- `IS_DEVNET`: Set to 'true' for devnet testing
- `SLIPPAGE_BPS`: Slippage tolerance in basis points (default: 100 = 1%)
- `JITO_TIP_MULT`: Multiplier for Jito tips
- `WALLETS_FILE`: Path to your wallets file
- `PRIORITY_FEE`: Priority fee in microlamports

### Wallet Configuration

The `wallets.txt` file should contain one wallet per line in the format:
```
public_key,private_key,amount_in_sol
```

Example:
```
ABC123...,XYZ789...,1.5
DEF456...,UVW321...,2.0
```

## Usage

1. Start the bot:
```bash
npm start
```

2. The bot will:
   - Load wallet configurations
   - Calculate total SOL injection
   - Prioritize wallets based on configuration
   - Begin parallel execution of buy orders
   - Automatically retry failed transactions
   - Monitor and report transaction status

## How It Works

1. **Wallet Loading**: The bot loads wallet configurations from `wallets.txt`
2. **Priority Calculation**: Wallets are prioritized based on:
   - Priority fee (increases with wallet position)
   - Jito tip multiplier
   - Estimated price impact
3. **Transaction Preparation**:
   - Creates Photon swap instructions
   - Sets compute unit limits and priority fees
   - Handles ATA (Associated Token Account) creation
4. **Execution**:
   - Sends transactions through Jito's MEV infrastructure
   - Implements parallel processing for multiple wallets
   - Includes automatic retry mechanism for failed transactions

## Security Considerations

- Never share your private keys
- Use a dedicated wallet for the bot
- Monitor transaction fees and slippage
- Keep your `.env` file secure
- Regularly update dependencies

## Disclaimer

This bot is provided as-is without any guarantees. Use at your own risk. Always test thoroughly on devnet before using on mainnet. The authors are not responsible for any financial losses incurred while using this bot.
