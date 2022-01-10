import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import WebView from "react-native-webview";
import { error } from "./error";

import { getTransactionStatus, sendPaymentData } from "./networking";
import { transactionStatus } from "./transactionStatus";

const PAYZE_URL = "https://payze.io";

const Payze = ({
  setPay,
  closeButtonTitle = "close",
  closeButtonTextStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const linkRef = useRef(PAYZE_URL);
  const transactionIdRef = useRef();
  const onSuccessRef = useRef();
  const onErrorRef = useRef();

  const onModalClose = () => {
    setModalVisible(false);
    linkRef.current = PAYZE_URL;
  };

  const onModalDismiss = () => {
    onErrorRef.current(error.CARD_VERIFICATION_CANCELLED);
    onModalClose();
  };

  const onWebViewNavStateChange = (navState) => {
    if (navState.url.includes(PAYZE_URL)) {
      onModalClose();
      onTransactionEnd(
        transactionIdRef.current,
        onSuccessRef.current,
        onErrorRef.current
      );
    }
  };

  const onTransactionEnd = async (transactionId, onSuccess, onError) => {
    const currentTransactionStatus = await getTransactionStatus(transactionId);

    if (
      currentTransactionStatus &&
      currentTransactionStatus.status !== transactionStatus.SUCCESS
    ) {
      onError(error.TRANSACTION_FAILURE);
    } else {
      onSuccess();
    }
  };

  const pay = async (
    cardNumber,
    cardHolder,
    expirationDate,
    securityNumber,
    transactionId,
    billingAddress,
    onSuccess,
    onError
  ) => {
    const result = await sendPaymentData(
      cardNumber,
      cardHolder,
      expirationDate,
      securityNumber,
      transactionId,
      billingAddress
    );

    transactionIdRef.current = transactionId;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;

    if (result && result.success) {
      if (result.threeDSIsPresent && result.url) {
        linkRef.current = result.url;
        setModalVisible(true);
      } else if (!result.threeDSIsPresent) {
        onTransactionEnd(
          transactionIdRef.current,
          onSuccessRef.current,
          onErrorRef.current
        );
      }
    } else if (result && !result.success) {
      onError(error.TRANSACTION_FAILURE);
    } else {
      onError(error.UNKNOWN_ERROR);
    }
  };

  useEffect(() => {
    setPay(pay);
  }, []);

  return (
    <Modal
      animationType="none"
      visible
      visible={modalVisible}
      onRequestClose={onModalDismiss}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBarContainer}>
          <View style={styles.filler} />
          <TouchableOpacity onPress={onModalDismiss} style={styles.closeButton}>
            <Text style={[styles.closeButtonText, closeButtonTextStyle]}>
              {closeButtonTitle}
            </Text>
          </TouchableOpacity>
        </View>
        <WebView
          style={styles.webView}
          source={{
            uri: linkRef.current,
          }}
          onNavigationStateChange={onWebViewNavStateChange}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    color: "blue",
  },
  filler: {
    flex: 1,
  },
  safeArea: {
    height: "100%",
    width: "100%",
  },
  topBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  webView: {
    flex: 1,
  },
});

export default Payze;
