import React, { useState , useEffect } from 'react'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const Decryption = (props: { N: number; E: number; D: number; encryptedNum: any }) => {

    // const [encryptedNumProps, setEncryptedNumProps] = useState<bigint>(); 
    const [encryptedNum, setEncryptedNum] = useState<any>(); 
    const [decryptedNum, setDecryptedNum] = useState<number>(); 

    const [changeD, setChangeD] = useState<bigint>(BigInt(props.D));


    useEffect( ()=>{
        console.log('pulled in props encrypted Num => ', props.encryptedNum);
        setEncryptedNum(props.encryptedNum); 
        console.log('setEncryptedNum => ', encryptedNum); 
        return () => {console.log('useEffect done')}
    }, [encryptedNum]);

    const handleNumChange = (e: { target: { value: any; }; }) => {
        let placeholder = (e.target.value);
        placeholder = BigInt(placeholder);
        setEncryptedNum(placeholder);
        console.log('handleNumChange setEncryptedNum => ', encryptedNum, ' -typeof- ', typeof encryptedNum);

    }
    const handleChangeD = (e: { target: { value: any; }; }) => {
        let placeholder = (e.target.value);
        setChangeD(placeholder);
        console.log('ChangedD => ', changeD); 
    };
    const handleSetDecryption = ():Promise<number> => {
        return new Promise( (res, rej) => {
            try {

                console.log('USING state changeD => ', changeD,' -typeof- ', typeof changeD); 
                let bigD = BigInt(changeD);
                console.log('USING regular props.D => ', props.D,' -typeof- ', typeof props.D); 
                console.log('USING bigint props.D => ', bigD,' -typeof- ', typeof bigD); 
                let bigN = BigInt(props.N); 
                console.log('USING regular props.N => ', props.N,' -typeof- ', typeof props.N); 
                console.log('USING bigint props.N => ', bigN,' -typeof- ', typeof bigN); 
                let bigEncrypt:any = encryptedNum; 
                bigEncrypt = BigInt(encryptedNum); 
                console.log('USING bigEncrypt => ', bigEncrypt, ' -typeof- ', typeof bigEncrypt); 


                // ----------------------------------------
                // --------------- decrypt
                let bigPow = bigEncrypt**bigD ; 
                let bigDecrypt = bigPow % bigN; 
                // E^D mod N 
                // ----------------------------------------

                console.log('NOT STATEFUL bigDecrypt ', bigDecrypt, ' typeof ', typeof bigDecrypt); 
                let numberizeDecrypt = Number(bigDecrypt); 

                res(numberizeDecrypt);
            }
            catch (error) {
                console.log('decrypt promise error ... ')
                rej(error); 
            }
        })
    }

    const handleDecryption = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); 
        let decrypt = await handleSetDecryption(); 
        decrypt = Number(decrypt); 
        setDecryptedNum(decrypt); 
        console.log('STATEFUL DEcrypted num ', decryptedNum); 
    }



    return(
        <div>
            <form>
                <Typography variant='h3'> Decrypt Your Number </ Typography>

                <TextField onChange={handleNumChange} label='Num to Decrypt' /> <br></br>
                <TextField onChange={handleChangeD} label='change your private key D!' value={changeD} /> <br></br>
            </form>
            <Button
                variant='outlined'
                size='large'
                color='secondary'
                type='submit'
                onClick={handleDecryption}
            >
                <text>DECRYPT NUMBER</text>
            </Button>  

            <Typography variant='h6'>Decrypted: {decryptedNum ? decryptedNum : 'N/A'} </Typography> 
     
        </div>
    )
}

export default Decryption; 