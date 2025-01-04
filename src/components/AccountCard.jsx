import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Card, CardContent, Typography, Grid, Snackbar, IconButton, Divider } from '@mui/material';
import { Alert } from '@mui/material';
import { useGetAccountsQuery, useAddAccountMutation, useUpdateAccountMutation } from '../reduxServices/Apis/StoreAccountApi'

const AccountCard = () => {
  const [iban, setIban] = useState('');
  const [bankName, setBankName] = useState('');
  const [user, setUser] = useState('');
  const [store, setStore] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showForm, setShowForm] = useState(true);  // State to toggle between form and card view
  
  const { data: accounts, refetch } = useGetAccountsQuery();
  const [addAccount] = useAddAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  useEffect(() => {
    if (updateId) {
      const account = accounts.find(acc => acc.id === updateId);
      if (account) {
        setIban(account.iban);
        setBankName(account.bank_name);
        setUser(account.user);
        setStore(account.store);
      }
    }
  }, [updateId, accounts]);

  const handleAddOrUpdate = async () => {
    try {
      if (updateId) {
        await updateAccount({ id: updateId, iban, bank_name: bankName, user, store });
        setSnackbarMessage('Account updated successfully');
      } else {
        await addAccount({ iban, bank_name: bankName, user, store });
        setSnackbarMessage('Account added successfully');
      }
      refetch();
      setOpenSnackbar(true);
      resetForm();
    } catch (error) {
      setSnackbarMessage('Failed to save account');
      setOpenSnackbar(true);
    }
  };

  const resetForm = () => {
    setIban('');
    setBankName('');
    setUser('');
    setStore('');
    setUpdateId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const toggleView = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={toggleView}
        sx={{ mb: 2 }}
      >
        {showForm ? 'Show Account Details' : 'Show Form'}
      </Button>

      {showForm ? (
        <Card sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {updateId ? 'Update Account' : 'Add Account'}
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <TextField
                  label="IBAN"
                  variant="outlined"
                  fullWidth
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bank Name"
                  variant="outlined"
                  fullWidth
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="User UUID"
                  variant="outlined"
                  fullWidth
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Store UUID"
                  variant="outlined"
                  fullWidth
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddOrUpdate}
            >
              {updateId ? 'Update Account' : 'Add Account'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Account Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            {accounts.length ? (
              accounts.map(account => (
                <Card key={account.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      IBAN: {account.iban}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bank Name: {account.bank_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      User UUID: {account.user}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Store UUID: {account.store}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No accounts available.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            ×
          </IconButton>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AccountCard;
