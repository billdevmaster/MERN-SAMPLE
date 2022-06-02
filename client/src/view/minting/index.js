import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Input, Row, Spinner } from 'reactstrap';
import Web3 from 'web3';
import { toast } from 'react-toastify';
import {NFTStorage} from 'nft.storage';
import ipfs from '../../utils/ipfsApi.js';
import axios from 'axios';
// import fs from'fs';

import { RealmABI, RealmAddr } from '../../constants/contract';
import { NFTStorageKey } from '../../constants/constants';
import { MintingStyle } from '../../style';
import GreenImage from '../../assets/images/green_sun.png';
import PinkImage from '../../assets/images/pink_sun.png';

const {ethereum} = window;
const web3 = new Web3(ethereum);
const client = new NFTStorage({token: NFTStorageKey});
const ImageList = [GreenImage, PinkImage];

const Minting = () => {
    const realmContract = new web3.eth.Contract(
        RealmABI,
        RealmAddr
      );

    const dispatch = useDispatch();
    const {userAddress} = useSelector((state) => {
        return {
            userAddress: state.userAddress
        }
    })
    const [processing, setProcessing] = useState(false)

    const mint = async () => {
        if (userAddress === '') {
            return toast.warning("please connect metamask")
        }
        setProcessing(true);
        // upload the image to ipfs
        const random = Math.floor(Math.random() * ImageList.length);
        const response = await axios(ImageList[random], {responseType: 'arraybuffer'});
        const result = await ipfs.files.add(Buffer.from(response.data));
        const cid = await client.storeDirectory([
            new File(
              [
                JSON.stringify({
                  name: "Realm NFT",
                  description: "Realm NFTs",
                  assetType: "image",
                  image: `https://ipfs.io/ipfs/${result[0].hash}`,
                }),
              ],
              'metadata.json'
            ),
          ]);
        const tokenURI = `https://ipfs.io/ipfs/${cid}/metadata.json`;

        realmContract.methods
        .mint(userAddress, tokenURI).send({from: userAddress})
        .then( res => {
          setProcessing(false);
          toast.success("Successfully Done.")
        })
        .catch( err => {
          setProcessing(false);
          toast.error("something is wrong.")
          console.log(err);
        })
    }
    return (
        <MintingStyle>
            <Container className="text-center">
                <Row style={{ marginTop: '100px' }}>
                    <h2 style={{ marginBottom: '20px' }}>NFT Minting DEMO</h2>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col md={4}></Col>
                    <Col md={2} xs={6}>
                        <img src={PinkImage} style={{ width: '100%'}}/>
                    </Col>
                    <Col md={2} xs={6}>
                        <img src={GreenImage} style={{ width: '100%'}}/>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Row>
                            <Button onClick={mint} className="btn btn-primary full">{processing ? <Spinner size="sm" color="dark"/> : <>Mint</>}</Button>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <a href="https://testnets.opensea.io/collection/realm-mitaveg612" target="_blank" >Check On Opensea</a>
                </Row>
            </Container>
        </MintingStyle>
    )
}

export default Minting;