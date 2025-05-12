import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import bs58 from 'bs58';
import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as readline from 'readline';

import {
  createSolanaRpc,
  createKeyPairSignerFromBytes,
} from "@solana/kit";

const blockEngineUrl = "tokyo.mainnet.block-engine.jito.wtf"

const c = searcherClient(blockEngineUrl, undefined);

dotenv.config();

// Jito endpoints
const JITO_ENDPOINTS = [
];


// Initialize connection
const connection = new Connection(SOLANA_RPC, {
  commitment: 'processed',
  confirmTransactionInitialTimeout: 15000,
  wsEndpoint: SOLANA_RPC.replace('https', 'wss'),
});

// Utility: Create keypair from private key

// Load wallets from file
async function loadWallets() {

  return lines.map((line, index) => {
  });
}

// Function to prepare and execute with retries
async function prepareAndExecuteWithRetry(
  wallet: any,
  tokenAddress: string,
  poolPubkey: PublicKey,
  amountInSol: number,
  priorityFee: number,
  estimatedPriceImpact: number,
  jitoTipMultiplier: number,
) {
  let attempt = 1;
  let lastError = null;

  while (true) {
    try {
      console.log(`\n=== Wallet ${wallet.number} - Attempt ${attempt} ===`);

      // Phase 1: Prepare
      console.log('Preparing buy...');

      console.log('✅ Buy prepared successfully');

      // Phase 2: Execute
      console.log('Executing buy...');
      const { blockhash } = await connection.getLatestBlockhash();

      if (result.success) {
        console.log(`✅ Buy successful! TX: ${result.txid}`);
        // Keep retrying even after success
        console.log('Continuing to retry for better price...');
      } else {
        console.log(`❌ Buy failed: ${result.error}`);
      }

      // // Small delay between attempts
      // await new Promise((resolve) => setTimeout(resolve, 200));
      // attempt++;
    } catch (error) {
      console.error(`❌ Error in attempt ${attempt}:`, error.message);
      lastError = error;

      // If it's a fatal error, throw it
      if (
        error.message.includes('fatal') ||
        error.message.includes('critical')
      ) {
        throw error;
      }

      // Small delay before retry
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempt++;
    }
  }
}

// Function to prepare a buy
async function prepareBuy(
  wallet: any,
  tokenAddress: string,
  poolPubkey: PublicKey,
  amountInSol: number,
  priorityFee: number,
  estimatedPriceImpact: number,
) {
  try {
    console.log('1. Preparing Photon swap transaction...');
    const mintPubkey = new PublicKey(tokenAddress);

    // Convert SOL amount to lamports
    const solAmount = Math.floor(amountInSol * 1_000_000_000);

    console.log("solAmount :> ", solAmount);

    // Create transaction
    const tx = new Transaction();

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = userKeypair.publicKey;

    // Sign transaction
    tx.sign(userKeypair);

    return {
      wallet,
      transaction: tx,
      priorityFee,
      slippage: SLIPPAGE_BPS / 100,
    };
  } catch (error) {
    console.error(`❌ Error preparing buy for wallet ${wallet.number}:`, error);
    throw error;
  }
}

// Add this helper function to get pool address
async function getPoolAddress(mintAddress: string): Promise<PublicKey> {
  try {
    return new PublicKey(pool address)  ;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to execute a prepared buy
async function executeBuy(
  wallet: any,
  prepared: any,
  blockhash: string,
  jitoTipMultiplier: number,
) {
  try {
    
    console.log('1. Creating Jito tip transaction...');

    console.log('✅ Jito tip transaction created successfully');

    console.log(`✅ - Using the following Jito Tip account: `);

    // Step 1 - Setup
    console.log(`✅ - Sending ${NUMBER_TRANSACTIONS} transactions from .`);

    const bundleResult: any = await c.sendBundle(b);

    console.log(`✅ Transaction sent via Jito: ${bundleResult}`);
    if (bundleResult) {
      return {
        wallet: wallet.number,
        success: true,
        jito: bundleResult.value,
        txid: sig,
        endpoint: blockEngineUrl,
        priorityFee: prepared.priorityFee,
        slippage: prepared.slippage,
      };
    }

    // If all Jito endpoints failed
    console.error('❌ All Jito endpoints failed');
    return {
      wallet: wallet.number,
      success: false,
      error: 'All Jito endpoints failed',
      priorityFee: prepared.priorityFee,
      slippage: prepared.slippage,
    };
  } catch (error) {
    console.error(`❌ Error executing buy for wallet ${wallet.number}:`, error);
    return {
      wallet: wallet.number,
      success: false,
      error: error.message,
      priorityFee: prepared.priorityFee,
      slippage: prepared.slippage,
    };
  }
}

// Main function
async function main() {
  try {

    const tokenAddress = "48X1ecCGX92jEEbCqK9N4gU73XJzLRHAyhtJpDKbpump";

    const poolPubkey = await getPoolAddress(tokenAddress);
    console.log("poolPubkey :> ", poolPubkey);

    // Load wallets
    console.log(`Loading wallets from ${WALLETS_FILE}...`);
    console.log(`Loaded ${wallets.length} wallets`);

    // Pause and wait for user input
    console.log('\nATAs have been created. Press ENTER to start sniping...');
    
    console.log(`Total SOL being injected: ${totalSolInjection} SOL`);

    // Order wallets by priority
    const prioritizedWallets = wallets.map((wallet, index) => {
      return {
        ...wallet,
        priorityFee,
        jitoTipMultiplier,
        estimatedPriceImpact,
      };
    });

    console.log('\n=== Starting Parallel Buy Process ===');
    const buyPromises = prioritizedWallets.map((wallet) =>
      prepareAndExecuteWithRetry(
        wallet,
        tokenAddress,
        poolPubkey,
        wallet.amount,
        wallet.priorityFee,
        wallet.estimatedPriceImpact,
        wallet.jitoTipMultiplier,
      ),
    );

    // Wait for all promises to complete (they won't actually complete due to retries)
    await Promise.all(buyPromises);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
