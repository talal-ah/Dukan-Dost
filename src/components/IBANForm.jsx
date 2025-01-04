
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { InputAdornment } from '@mui/material';

function IBANForm() {
    const [iban, setIban] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [error, setError] = useState(false);

    const handleIbanChange = (e) => {
        setIban(e.target.value);
        if (e.target.value.length < 15 || e.target.value.length > 34) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error && iban.length >= 15 && iban.length <= 34) {
            setShowCard(true); // Show the IBAN in the card once valid IBAN is submitted
        } else {
            setShowCard(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                margin: '2rem auto',
            }}
        >
            {/* IBAN Form */}
            <Typography variant="h5" gutterBottom>
                Enter Your IBAN
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    label="IBAN Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={iban}
                    onChange={handleIbanChange}
                    error={error}
                    helperText={error ? 'IBAN must be between 15 and 34 characters long' : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountBalanceIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ backgroundColor: '#fff' }}
                />

                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                        backgroundColor: '#7C41F5',
                        color: '#fff',
                        padding: '0.75rem',
                        marginTop: '1rem',
                        '&:hover': {
                            backgroundColor: '#6436c5',
                        },
                    }}
                >
                    Submit IBAN
                </Button>
            </form>

            {/* Show IBAN in a card once entered */}
            {showCard && (
                <Card
                    sx={{
                        marginTop: '2rem',
                        width: '100%',
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Your IBAN
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {iban}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default IBANForm;




