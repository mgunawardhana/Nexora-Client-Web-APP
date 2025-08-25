import { useEffect, useState, useRef } from "react";
import jsQR from "jsqr";

export default function TopRatedServices() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cameraStream, setCameraStream] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Effect to start/stop camera based on isScanning state
    useEffect(() => {
        if (isScanning) {
            startCamera();
        } else {
            stopCamera();
        }

        // Cleanup function to ensure camera is stopped when component unmounts
        return () => {
            stopCamera();
        };
    }, [isScanning]);

    const startCamera = async () => {
        try {
            setCameraError(null);
            setScannedData(null); // Reset previous scan data
            console.log("Requesting camera access...");

            // **MODIFIED: Added advanced constraints for autofocus**
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "environment", // Prefer back camera for QR scanning
                    // Advanced settings for better focus
                    advanced: [{ focusMode: "continuous" }],
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("Camera stream obtained:", stream);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(playError => {
                        console.error("Error playing video:", playError);
                        setCameraError("Failed to play video stream.");
                        stopCamera();
                    });
                    // **NEW: Start the QR scanning loop**
                    requestAnimationFrame(scanQRCode);
                };
            }
            setCameraStream(stream);
        } catch (error) {
            console.error("Camera access error:", error);
            let errorMessage = "Failed to access camera. Please check permissions.";
            if (error.name === "NotAllowedError") {
                errorMessage = "Camera access was denied. Please allow camera permissions in your browser settings.";
            } else if (error.name === "NotFoundError") {
                errorMessage = "No camera found on this device.";
            }
            setCameraError(errorMessage);
            setIsScanning(false);
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            console.log("Stopping camera...");
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
    };

    // **NEW: Function to scan for QR codes in the video feed**
    const scanQRCode = () => {
        // Stop scanning if the state is no longer active or refs are not set
        if (!isScanning || !videoRef.current || !canvasRef.current) {
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            // Use jsQR to detect QR code
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });

            if (code) {
                console.log("QR Code detected:", code.data);
                setScannedData(code.data);
                setIsScanning(false); // Stop scanning after a successful scan
                return; // Exit the loop
            }
        }

        // Continue scanning on the next frame
        requestAnimationFrame(scanQRCode);
    };


    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedCard(null);
    };

    const Popup = ({ card, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-6 w-[90%] md:w-[50%]">
                <button
                    className="absolute top-3 right-3 bg-[#ffa502] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
                    onClick={onClose}
                >
                    ✖
                </button>
                <img
                    src={card?.media || 'https://via.placeholder.com/300'}
                    alt={card?.title || 'Default Title'}
                    className="rounded-lg w-full h-[300px] object-cover mb-4"
                />
                <h2 className="text-2xl font-bold mb-4">{card?.title || 'Default Title'}</h2>
                <p className="text-gray-700">{card?.description || 'Default Description'}</p>
            </div>
        </div>
    );

    const Card = ({ image, heading, ratings, card }) => (
        <div
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(card)}
        >
            <div className="relative">
                <img
                    src={image}
                    alt="TopRatedServices Destination"
                    className="rounded-t-2xl w-full h-[300px] object-cover"
                />
                <p className="bg-white text-[#ffa502] font-semibold rounded-lg p-1 text-sm absolute top-4 right-4">
                    {ratings}%
                </p>
            </div>
            <div className="p-4">
                <h5 className="text-xl font-semibold">{heading}</h5>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-6">
            <section className="py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">HR Registry QR Code Scanner System</h1>
                    <p className="text-lg text-gray-600">Streamline employee verification and access management with advanced QR code scanning technology.</p>
                </div>
                <div className="lg:flex items-center justify-between py-16 gap-12">
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <span className="bg-[#ffa502] text-white px-3 py-1 rounded-xl">01</span>
                            <h2 className="font-bold text-lg py-4">Instant QR Code Recognition & Verification</h2>
                            <p className="text-gray-500">
                                Quickly scan employee QR codes to instantly access HR registry information, attendance records, and verification status with advanced AI-powered recognition technology.
                            </p>
                        </div>
                        <div>
                            <span className="bg-[#ffa502] text-white px-3 py-1 rounded-xl">02</span>
                            <h2 className="font-bold text-lg py-4">Secure Employee Database Integration</h2>
                            <p className="text-gray-500">
                                Ensure workplace security with encrypted QR codes that provide real-time employee authentication, access control management, and seamless HR database integration.
                            </p>
                        </div>
                        <div>
                            <span className="bg-[#ffa502] text-white px-3 py-1 rounded-xl">03</span>
                            <h2 className="font-bold text-lg py-4">Automated Attendance & Access Logging</h2>
                            <p className="text-gray-500">
                                Streamline HR operations with automated attendance tracking, access logs, and comprehensive employee management through intelligent QR code scanning.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button
                                className="bg-[#ffa502] text-white px-6 py-3 rounded-xl shadow hover:bg-white hover:text-[#ffa502] border border-transparent hover:border-[#ffa502] transition-colors duration-300"
                                onClick={() => setIsScanning(prev => !prev)}
                                disabled={isScanning}
                            >
                                {isScanning ? 'Scanning...' : 'Start QR Scanner'}
                            </button>
                            {/* **NEW: Reset button for after a scan** */}
                            {scannedData && (
                                <button
                                    className="bg-gray-600 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-700 transition-colors duration-300"
                                    onClick={() => setScannedData(null)}
                                >
                                    Reset Scanner
                                </button>
                            )}
                            <button className="bg-white text-[#ffa502] border border-[#ffa502] px-6 py-3 rounded-xl shadow hover:bg-[#ffa502] hover:text-white transition-colors duration-300">
                                View HR Registry
                            </button>
                        </div>
                        {/* **NEW: Display scanned data** */}
                        {scannedData && (
                            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
                                <h3 className="font-bold text-lg">Scan Successful!</h3>
                                <p className="break-words"><strong>Data:</strong> {scannedData}</p>
                            </div>
                        )}
                    </div>
                    <div className="lg:w-1/2 overflow-hidden rounded-2xl mt-8 lg:mt-0">
                        {/* **NEW: Added canvas element for jsQR (hidden from view)** */}
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <div className="relative bg-gray-900 rounded-2xl min-h-[500px] h-full flex items-center justify-center">
                            {isScanning && (
                                <video
                                    ref={videoRef}
                                    playsInline // Important for iOS
                                    muted
                                    className="rounded-2xl w-full h-full object-cover absolute top-0 left-0"
                                />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-64 h-64 border-4 border-white rounded-2xl relative">
                                        <div className="absolute top-[-4px] left-[-4px] w-8 h-8 border-l-4 border-t-4 border-[#ffa502] rounded-tl-lg"></div>
                                        <div className="absolute top-[-4px] right-[-4px] w-8 h-8 border-r-4 border-t-4 border-[#ffa502] rounded-tr-lg"></div>
                                        <div className="absolute bottom-[-4px] left-[-4px] w-8 h-8 border-l-4 border-b-4 border-[#ffa502] rounded-bl-lg"></div>
                                        <div className="absolute bottom-[-4px] right-[-4px] w-8 h-8 border-r-4 border-b-4 border-[#ffa502] rounded-br-lg"></div>
                                    </div>
                                    <div className="absolute inset-0 bg-[#ffa502] opacity-10 animate-pulse rounded-2xl"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg z-10">
                                <p className="text-sm text-center">
                                    {cameraError ? `Error: ${cameraError}` : "Position QR code within the frame"}
                                </p>
                            </div>
                            {isScanning && (
                                <div className="absolute top-4 right-4 flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm z-10">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                                    Camera Active
                                </div>
                            )}
                            {!isScanning && (
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center rounded-2xl">
                                    <div className="text-center text-white p-4">
                                        <div className="text-6xl mb-4">📷</div>
                                        <p className="text-lg font-semibold">QR Code Scanner</p>
                                        <p className="text-sm opacity-80">Click "Start QR Scanner" to begin</p>
                                        {cameraError && (
                                            <p className="text-red-400 text-sm mt-2">Error: {cameraError}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {showPopup && selectedCard && (
                <Popup card={selectedCard} onClose={closePopup} />
            )}
        </div>
    );
}