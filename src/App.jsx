import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import PageLoader from './components/ui/PageLoader.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'

// Route-level code splitting: each page is only downloaded when it's
// visited, instead of bundling all pages into a single initial chunk.
const Home = lazy(() => import('./pages/Home.jsx'))
const Tools = lazy(() => import('./pages/Tools.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const GenericToolPage = lazy(() => import('./pages/GenericToolPage.jsx'))

// Image tools (Phase 3 - fully working, browser-based)
const JpgToPng = lazy(() => import('./pages/tools/JpgToPng.jsx'))
const PngToJpg = lazy(() => import('./pages/tools/PngToJpg.jsx'))
const WebpToPng = lazy(() => import('./pages/tools/WebpToPng.jsx'))
const WebpToJpg = lazy(() => import('./pages/tools/WebpToJpg.jsx'))
const ConvertToWebp = lazy(() => import('./pages/tools/ConvertToWebp.jsx'))
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor.jsx'))
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer.jsx'))
const ImageCrop = lazy(() => import('./pages/tools/ImageCrop.jsx'))
const ImageRotate = lazy(() => import('./pages/tools/ImageRotate.jsx'))
const FlipImage = lazy(() => import('./pages/tools/FlipImage.jsx'))
const FaviconGenerator = lazy(() => import('./pages/tools/FaviconGenerator.jsx'))
const JpgToPdf = lazy(() => import('./pages/tools/JpgToPdf.jsx'))
const PngToPdf = lazy(() => import('./pages/tools/PngToPdf.jsx'))
const MergePdf = lazy(() => import('./pages/tools/MergePdf.jsx'))
const SplitPdf = lazy(() => import('./pages/tools/SplitPdf.jsx'))
const ColorPicker = lazy(() => import('./pages/tools/ColorPicker.jsx'))
const HexToRgb = lazy(() => import('./pages/tools/HexToRgb.jsx'))
const RgbToHex = lazy(() => import('./pages/tools/RgbToHex.jsx'))
const HexToHsl = lazy(() => import('./pages/tools/HexToHsl.jsx'))
const ColorConverter = lazy(() => import('./pages/tools/ColorConverter.jsx'))
const PaletteGenerator = lazy(() => import('./pages/tools/PaletteGenerator.jsx'))
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter.jsx'))
const CodeMinifier = lazy(() => import('./pages/tools/CodeMinifier.jsx'))
const JsonValidator = lazy(() => import('./pages/tools/JsonValidator.jsx'))
const Base64Encoder = lazy(() => import('./pages/tools/Base64Encoder.jsx'))
const UrlEncoder = lazy(() => import('./pages/tools/UrlEncoder.jsx'))
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator.jsx'))
const QrCodeGenerator = lazy(() => import('./pages/tools/QrCodeGenerator.jsx'))
const UrlShortener = lazy(() => import('./pages/tools/UrlShortener.jsx'))
const UserAgentParser = lazy(() => import('./pages/tools/UserAgentParser.jsx'))
const HtaccessGenerator = lazy(() => import('./pages/tools/HtaccessGenerator.jsx'))
const CronExpressionGenerator = lazy(() => import('./pages/tools/CronExpressionGenerator.jsx'))
const SchemaMarkupGenerator = lazy(() => import('./pages/tools/SchemaMarkupGenerator.jsx'))
const AudioConverter = lazy(() => import('./pages/tools/AudioConverter.jsx'))
const AudioTrimmer = lazy(() => import('./pages/tools/AudioTrimmer.jsx'))
const VideoToGif = lazy(() => import('./pages/tools/VideoToGif.jsx'))
const VideoTrimmer = lazy(() => import('./pages/tools/VideoTrimmer.jsx'))
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter.jsx'))
const MetaTagGenerator = lazy(() => import('./pages/tools/MetaTagGenerator.jsx'))
const TextDiffChecker = lazy(() => import('./pages/tools/TextDiffChecker.jsx'))
const AudioMerger = lazy(() => import('./pages/tools/AudioMerger.jsx'))
const AudioVolumeChanger = lazy(() => import('./pages/tools/AudioVolumeChanger.jsx'))
const AudioReverser = lazy(() => import('./pages/tools/AudioReverser.jsx'))
const AudioFade = lazy(() => import('./pages/tools/AudioFade.jsx'))
const AudioSpeedChanger = lazy(() => import('./pages/tools/AudioSpeedChanger.jsx'))
const SilenceTrimmer = lazy(() => import('./pages/tools/SilenceTrimmer.jsx'))
const VideoToAudio = lazy(() => import('./pages/tools/VideoToAudio.jsx'))
const VideoMuter = lazy(() => import('./pages/tools/VideoMuter.jsx'))
const VideoSpeedChanger = lazy(() => import('./pages/tools/VideoSpeedChanger.jsx'))
const VideoConverter = lazy(() => import('./pages/tools/VideoConverter.jsx'))
const VideoResizer = lazy(() => import('./pages/tools/VideoResizer.jsx'))
const VideoCompressor = lazy(() => import('./pages/tools/VideoCompressor.jsx'))
const BackgroundRemover = lazy(() => import('./pages/tools/BackgroundRemover.jsx'))
const LengthConverter = lazy(() => import('./pages/tools/LengthConverter.jsx'))
const WeightConverter = lazy(() => import('./pages/tools/WeightConverter.jsx'))
const VolumeConverter = lazy(() => import('./pages/tools/VolumeConverter.jsx'))
const TemperatureConverter = lazy(() => import('./pages/tools/TemperatureConverter.jsx'))
const AreaConverter = lazy(() => import('./pages/tools/AreaConverter.jsx'))
const SpeedConverter = lazy(() => import('./pages/tools/SpeedConverter.jsx'))
const TimeConverter = lazy(() => import('./pages/tools/TimeConverter.jsx'))
const DataConverter = lazy(() => import('./pages/tools/DataConverter.jsx'))
const PressureConverter = lazy(() => import('./pages/tools/PressureConverter.jsx'))
const EnergyConverter = lazy(() => import('./pages/tools/EnergyConverter.jsx'))
const PowerConverter = lazy(() => import('./pages/tools/PowerConverter.jsx'))
const AngleConverter = lazy(() => import('./pages/tools/AngleConverter.jsx'))
const ShortUrlRedirect = lazy(() => import('./pages/ShortUrlRedirect.jsx'))
const HashGenerator = lazy(() => import('./pages/tools/HashGenerator.jsx'))
const TimestampConverter = lazy(() => import('./pages/tools/TimestampConverter.jsx'))
const RegexTester = lazy(() => import('./pages/tools/RegexTester.jsx'))
const PdfToJpg = lazy(() => import('./pages/tools/PdfToJpg.jsx'))
const PdfToPng = lazy(() => import('./pages/tools/PdfToPng.jsx'))
const GradientGenerator = lazy(() => import('./pages/tools/GradientGenerator.jsx'))
const PowerBiThemeGenerator = lazy(() => import('./pages/tools/PowerBiThemeGenerator.jsx'))
const PdfToWord = lazy(() => import('./pages/tools/PdfToWord.jsx'))
const CompressPdf = lazy(() => import('./pages/tools/CompressPdf.jsx'))
const PdfToPowerpoint = lazy(() => import('./pages/tools/PdfToPowerpoint.jsx'))
const PowerPointToPdf = lazy(() => import('./pages/tools/PowerPointToPdf.jsx'))
const ExcelToPdf = lazy(() => import('./pages/tools/ExcelToPdf.jsx'))
const WordToPdf = lazy(() => import('./pages/tools/WordToPdf.jsx'))
const YoutubeThumbnailDownloader = lazy(() => import('./pages/tools/YoutubeThumbnailDownloader.jsx'))
const TwitterImageResizer = lazy(() => import('./pages/tools/TwitterImageResizer.jsx'))
const FacebookImageResizer = lazy(() => import('./pages/tools/FacebookImageResizer.jsx'))
const LinkedInImageResizer = lazy(() => import('./pages/tools/LinkedInImageResizer.jsx'))
const PinterestPinResizer = lazy(() => import('./pages/tools/PinterestPinResizer.jsx'))
const WhatsAppLinkGenerator = lazy(() => import('./pages/tools/WhatsAppLinkGenerator.jsx'))
const WhatsAppTextFormatter = lazy(() => import('./pages/tools/WhatsAppTextFormatter.jsx'))
const WhatsAppQrGenerator = lazy(() => import('./pages/tools/WhatsAppQrGenerator.jsx'))
const WhatsAppStatusResizer = lazy(() => import('./pages/tools/WhatsAppStatusResizer.jsx'))
const RemoveDuplicateLines = lazy(() => import('./pages/tools/RemoveDuplicateLines.jsx'))
const TextReverser = lazy(() => import('./pages/tools/TextReverser.jsx'))
const UpsideDownTextGenerator = lazy(() => import('./pages/tools/UpsideDownTextGenerator.jsx'))
const TrimWhitespace = lazy(() => import('./pages/tools/TrimWhitespace.jsx'))
const SlugGenerator = lazy(() => import('./pages/tools/SlugGenerator.jsx'))
const LineCounter = lazy(() => import('./pages/tools/LineCounter.jsx'))
const TextToBinary = lazy(() => import('./pages/tools/TextToBinary.jsx'))
const BinaryToText = lazy(() => import('./pages/tools/BinaryToText.jsx'))
const FindAndReplace = lazy(() => import('./pages/tools/FindAndReplace.jsx'))
const PercentageCalculator = lazy(() => import('./pages/tools/PercentageCalculator.jsx'))
const CompoundInterestCalculator = lazy(() => import('./pages/tools/CompoundInterestCalculator.jsx'))
const LoanCalculator = lazy(() => import('./pages/tools/LoanCalculator.jsx'))
const ProfitMarginCalculator = lazy(() => import('./pages/tools/ProfitMarginCalculator.jsx'))
const AgeCalculator = lazy(() => import('./pages/tools/AgeCalculator.jsx'))
const ColorContrastChecker = lazy(() => import('./pages/tools/ColorContrastChecker.jsx'))
const DarkenLightenColor = lazy(() => import('./pages/tools/DarkenLightenColor.jsx'))
const RandomColorGenerator = lazy(() => import('./pages/tools/RandomColorGenerator.jsx'))
const CssFormatter = lazy(() => import('./pages/tools/CssFormatter.jsx'))
const CssMinifier = lazy(() => import('./pages/tools/CssMinifier.jsx'))
const HtmlFormatter = lazy(() => import('./pages/tools/HtmlFormatter.jsx'))
const HtmlMinifier = lazy(() => import('./pages/tools/HtmlMinifier.jsx'))
const XmlFormatter = lazy(() => import('./pages/tools/XmlFormatter.jsx'))
const XmlMinifier = lazy(() => import('./pages/tools/XmlMinifier.jsx'))
const JavascriptMinifier = lazy(() => import('./pages/tools/JavascriptMinifier.jsx'))
const HtmlEntitiesEncoder = lazy(() => import('./pages/tools/HtmlEntitiesEncoder.jsx'))
const HtmlEntitiesDecoder = lazy(() => import('./pages/tools/HtmlEntitiesDecoder.jsx'))
const JwtDecoder = lazy(() => import('./pages/tools/JwtDecoder.jsx'))
const Md5HashGenerator = lazy(() => import('./pages/tools/Md5HashGenerator.jsx'))
const Sha1HashGenerator = lazy(() => import('./pages/tools/Sha1HashGenerator.jsx'))
const Sha256HashGenerator = lazy(() => import('./pages/tools/Sha256HashGenerator.jsx'))
const Sha512HashGenerator = lazy(() => import('./pages/tools/Sha512HashGenerator.jsx'))
const JsonToCsv = lazy(() => import('./pages/tools/JsonToCsv.jsx'))
const CsvToJson = lazy(() => import('./pages/tools/CsvToJson.jsx'))
const XmlToJson = lazy(() => import('./pages/tools/XmlToJson.jsx'))
const JsonToXml = lazy(() => import('./pages/tools/JsonToXml.jsx'))
const YamlToJson = lazy(() => import('./pages/tools/YamlToJson.jsx'))
const JsonToYaml = lazy(() => import('./pages/tools/JsonToYaml.jsx'))
const CsvToXml = lazy(() => import('./pages/tools/CsvToXml.jsx'))
const XmlToCsv = lazy(() => import('./pages/tools/XmlToCsv.jsx'))
const ExcelToJson = lazy(() => import('./pages/tools/ExcelToJson.jsx'))
const CsvToExcel = lazy(() => import('./pages/tools/CsvToExcel.jsx'))
const RandomNamePicker = lazy(() => import('./pages/tools/RandomNamePicker.jsx'))
const RandomWordGenerator = lazy(() => import('./pages/tools/RandomWordGenerator.jsx'))
const RandomNumberGenerator = lazy(() => import('./pages/tools/RandomNumberGenerator.jsx'))
const CoinFlipper = lazy(() => import('./pages/tools/CoinFlipper.jsx'))
const DiceRoller = lazy(() => import('./pages/tools/DiceRoller.jsx'))
const ChoiceWheelSpinner = lazy(() => import('./pages/tools/ChoiceWheelSpinner.jsx'))
const DigitalSignatureGenerator = lazy(() => import('./pages/tools/DigitalSignatureGenerator.jsx'))
const AesEncryption = lazy(() => import('./pages/tools/AesEncryption.jsx'))
const HtpasswdGenerator = lazy(() => import('./pages/tools/HtpasswdGenerator.jsx'))
const RsaKeyPairGenerator = lazy(() => import('./pages/tools/RsaKeyPairGenerator.jsx'))
const SubnetCalculator = lazy(() => import('./pages/tools/SubnetCalculator.jsx'))
const MyIpAddress = lazy(() => import('./pages/tools/MyIpAddress.jsx'))
const DnsLookup = lazy(() => import('./pages/tools/DnsLookup.jsx'))
const HttpHeaderChecker = lazy(() => import('./pages/tools/HttpHeaderChecker.jsx'))
const UrlRedirectChecker = lazy(() => import('./pages/tools/UrlRedirectChecker.jsx'))
const BarcodeGenerator = lazy(() => import('./pages/tools/BarcodeGenerator.jsx'))
const BarcodeScanner = lazy(() => import('./pages/tools/BarcodeScanner.jsx'))
const QrCodeScanner = lazy(() => import('./pages/tools/QrCodeScanner.jsx'))
const SvgConverter = lazy(() => import('./pages/tools/SvgConverter.jsx'))
const SrtToVtt = lazy(() => import('./pages/tools/SrtToVtt.jsx'))
const SqlToMarkdownTable = lazy(() => import('./pages/tools/SqlToMarkdownTable.jsx'))
const JsonToHtmlTable = lazy(() => import('./pages/tools/JsonToHtmlTable.jsx'))
const YamlToToml = lazy(() => import('./pages/tools/YamlToToml.jsx'))
const RobotsTxtValidator = lazy(() => import('./pages/tools/RobotsTxtValidator.jsx'))
const JsonStringEscape = lazy(() => import('./pages/tools/JsonStringEscape.jsx'))
const AnagramNameShuffler = lazy(() => import('./pages/tools/AnagramNameShuffler.jsx'))
const SarcasticTextAlternator = lazy(() => import('./pages/tools/SarcasticTextAlternator.jsx'))
const TailwindGridGenerator = lazy(() => import('./pages/tools/TailwindGridGenerator.jsx'))
const GlassmorphismBuilder = lazy(() => import('./pages/tools/GlassmorphismBuilder.jsx'))
const DataUriEncoder = lazy(() => import('./pages/tools/DataUriEncoder.jsx'))
const Base64ToImage = lazy(() => import('./pages/tools/Base64ToImage.jsx'))
const BuzzwordBingo = lazy(() => import('./pages/tools/BuzzwordBingo.jsx'))
const HexCodeScroller = lazy(() => import('./pages/tools/HexCodeScroller.jsx'))
const LoremIpsumFantasy = lazy(() => import('./pages/tools/LoremIpsumFantasy.jsx'))
const DumbPhoneFormatter = lazy(() => import('./pages/tools/DumbPhoneFormatter.jsx'))
const MorseAudioPlayer = lazy(() => import('./pages/tools/MorseAudioPlayer.jsx'))
const MorseTapTransmitter = lazy(() => import('./pages/tools/MorseTapTransmitter.jsx'))
const DrumPad = lazy(() => import('./pages/tools/DrumPad.jsx'))
const Soundboard = lazy(() => import('./pages/tools/Soundboard.jsx'))
const WhiteNoiseMixer = lazy(() => import('./pages/tools/WhiteNoiseMixer.jsx'))
const TtsPitcher = lazy(() => import('./pages/tools/TtsPitcher.jsx'))
const ExifScrubber = lazy(() => import('./pages/tools/ExifScrubber.jsx'))
const CsvFilter = lazy(() => import('./pages/tools/CsvFilter.jsx'))
const AddressCleaner = lazy(() => import('./pages/tools/AddressCleaner.jsx'))
const AsciiArt = lazy(() => import('./pages/tools/AsciiArt.jsx'))
const BubbleWrapPopper = lazy(() => import('./pages/tools/BubbleWrapPopper.jsx'))
const PixelArtPad = lazy(() => import('./pages/tools/PixelArtPad.jsx'))
const EightBitCharacterCreator = lazy(() => import('./pages/tools/EightBitCharacterCreator.jsx'))
const EmojiMashup = lazy(() => import('./pages/tools/EmojiMashup.jsx'))
const PromptRoulette = lazy(() => import('./pages/tools/PromptRoulette.jsx'))
const TriviaFlashcards = lazy(() => import('./pages/tools/TriviaFlashcards.jsx'))
const TarotReader = lazy(() => import('./pages/tools/TarotReader.jsx'))
const MemeOverlay = lazy(() => import('./pages/tools/MemeOverlay.jsx'))
const FakeLoadingScreen = lazy(() => import('./pages/tools/FakeLoadingScreen.jsx'))
const HabitStreak = lazy(() => import('./pages/tools/HabitStreak.jsx'))
const RickrollGenerator = lazy(() => import('./pages/tools/RickrollGenerator.jsx'))
const FakeErrorDesigner = lazy(() => import('./pages/tools/FakeErrorDesigner.jsx'))
const WordCounter = lazy(() => import('./pages/tools/WordCounter.jsx'))
const CaseConverter = lazy(() => import('./pages/tools/CaseConverter.jsx'))
const LoremIpsumGenerator = lazy(() => import('./pages/tools/LoremIpsumGenerator.jsx'))
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator.jsx'))
const PasswordStrengthChecker = lazy(() => import('./pages/tools/PasswordStrengthChecker.jsx'))
const InstagramPostResizer = lazy(() => import('./pages/tools/InstagramPostResizer.jsx'))
const ImageUpscaler = lazy(() => import('./pages/tools/ImageUpscaler.jsx'))
const ImageEnhancer = lazy(() => import('./pages/tools/ImageEnhancer.jsx'))

// Auth (Phase 5)
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword.jsx'))
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail.jsx'))
const CheckEmail = lazy(() => import('./pages/auth/CheckEmail.jsx'))

// User dashboard (Phase 5)
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.jsx'))
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview.jsx'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers.jsx'))
const AdminTools = lazy(() => import('./pages/admin/AdminTools.jsx'))
const AdminUsage = lazy(() => import('./pages/admin/AdminUsage.jsx'))
const AdminToolEditor = lazy(() => import('./pages/admin/AdminToolEditor.jsx'))
const AdminBlogList = lazy(() => import('./pages/admin/AdminBlogList.jsx'))
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor.jsx'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings.jsx'))
const AdminContactMessages = lazy(() => import('./pages/admin/AdminContactMessages.jsx'))
const AdminComments = lazy(() => import('./pages/admin/AdminComments.jsx'))
const Profile = lazy(() => import('./pages/dashboard/Profile.jsx'))
const Favorites = lazy(() => import('./pages/dashboard/Favorites.jsx'))
const History = lazy(() => import('./pages/dashboard/History.jsx'))
const ShortenedUrls = lazy(() => import('./pages/dashboard/ShortenedUrls.jsx'))
const Downloads = lazy(() => import('./pages/dashboard/Downloads.jsx'))
const Settings = lazy(() => import('./pages/dashboard/Settings.jsx'))
const Subscription = lazy(() => import('./pages/dashboard/Subscription.jsx'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />

          {/* Image tools */}
          <Route path="/tools/jpg-to-png" element={<JpgToPng />} />
          <Route path="/tools/png-to-jpg" element={<PngToJpg />} />
          <Route path="/tools/webp-to-png" element={<WebpToPng />} />
          <Route path="/tools/webp-to-jpg" element={<WebpToJpg />} />
          <Route path="/tools/convert-to-webp" element={<ConvertToWebp />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/image-crop" element={<ImageCrop />} />
          <Route path="/tools/image-rotate" element={<ImageRotate />} />
          <Route path="/tools/flip-image" element={<FlipImage />} />
          <Route path="/tools/favicon-generator" element={<FaviconGenerator />} />
          <Route path="/tools/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/tools/png-to-pdf" element={<PngToPdf />} />
          <Route path="/tools/merge-pdf" element={<MergePdf />} />
          <Route path="/tools/split-pdf" element={<SplitPdf />} />
          <Route path="/tools/color-picker" element={<ColorPicker />} />
          <Route path="/tools/hex-to-rgb" element={<HexToRgb />} />
          <Route path="/tools/rgb-to-hex" element={<RgbToHex />} />
          <Route path="/tools/hex-to-hsl" element={<HexToHsl />} />
          <Route path="/tools/color-converter" element={<ColorConverter />} />
          <Route path="/tools/palette-generator" element={<PaletteGenerator />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />
          <Route path="/tools/code-minifier" element={<CodeMinifier />} />
          <Route path="/tools/json-validator" element={<JsonValidator />} />
          <Route path="/tools/base64-encoder" element={<Base64Encoder />} />
          <Route path="/tools/url-encoder" element={<UrlEncoder />} />
          <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="/tools/qr-code-generator" element={<QrCodeGenerator />} />
          <Route path="/tools/url-shortener" element={<UrlShortener />} />
          <Route path="/tools/user-agent-parser" element={<UserAgentParser />} />
          <Route path="/tools/htaccess-generator" element={<HtaccessGenerator />} />
          <Route path="/tools/cron-expression-generator" element={<CronExpressionGenerator />} />
          <Route path="/tools/schema-markup-generator" element={<SchemaMarkupGenerator />} />
          <Route path="/tools/audio-to-wav-converter" element={<AudioConverter />} />
          <Route path="/tools/audio-trimmer" element={<AudioTrimmer />} />
          <Route path="/tools/video-to-gif" element={<VideoToGif />} />
          <Route path="/tools/video-trimmer" element={<VideoTrimmer />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="/tools/text-diff-checker" element={<TextDiffChecker />} />
          <Route path="/tools/audio-merger" element={<AudioMerger />} />
          <Route path="/tools/audio-volume-changer" element={<AudioVolumeChanger />} />
          <Route path="/tools/audio-reverser" element={<AudioReverser />} />
          <Route path="/tools/audio-fade" element={<AudioFade />} />
          <Route path="/tools/audio-speed-changer" element={<AudioSpeedChanger />} />
          <Route path="/tools/silence-trimmer" element={<SilenceTrimmer />} />
          <Route path="/tools/video-to-audio" element={<VideoToAudio />} />
          <Route path="/tools/video-muter" element={<VideoMuter />} />
          <Route path="/tools/video-speed-changer" element={<VideoSpeedChanger />} />
          <Route path="/tools/video-converter" element={<VideoConverter />} />
          <Route path="/tools/video-resizer" element={<VideoResizer />} />
          <Route path="/tools/video-compressor" element={<VideoCompressor />} />
          <Route path="/tools/background-remover" element={<BackgroundRemover />} />
          <Route path="/tools/length-converter" element={<LengthConverter />} />
          <Route path="/tools/weight-converter" element={<WeightConverter />} />
          <Route path="/tools/volume-converter" element={<VolumeConverter />} />
          <Route path="/tools/temperature-converter" element={<TemperatureConverter />} />
          <Route path="/tools/area-converter" element={<AreaConverter />} />
          <Route path="/tools/speed-converter" element={<SpeedConverter />} />
          <Route path="/tools/time-converter" element={<TimeConverter />} />
          <Route path="/tools/data-converter" element={<DataConverter />} />
          <Route path="/tools/pressure-converter" element={<PressureConverter />} />
          <Route path="/tools/energy-converter" element={<EnergyConverter />} />
          <Route path="/tools/power-converter" element={<PowerConverter />} />
          <Route path="/tools/angle-converter" element={<AngleConverter />} />
          <Route path="/s/:code" element={<ShortUrlRedirect />} />
          <Route path="/tools/hash-generator" element={<HashGenerator />} />
          <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/tools/regex-tester" element={<RegexTester />} />
          <Route path="/tools/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/tools/pdf-to-png" element={<PdfToPng />} />
          <Route path="/tools/gradient-generator" element={<GradientGenerator />} />
          <Route path="/tools/power-bi-theme-generator" element={<PowerBiThemeGenerator />} />
          <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="/tools/compress-pdf" element={<CompressPdf />} />
          <Route path="/tools/pdf-to-powerpoint" element={<PdfToPowerpoint />} />
          <Route path="/tools/powerpoint-to-pdf" element={<PowerPointToPdf />} />
          <Route path="/tools/excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="/tools/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloader />} />
          <Route path="/tools/twitter-image-resizer" element={<TwitterImageResizer />} />
          <Route path="/tools/facebook-image-resizer" element={<FacebookImageResizer />} />
          <Route path="/tools/linkedin-image-resizer" element={<LinkedInImageResizer />} />
          <Route path="/tools/pinterest-pin-resizer" element={<PinterestPinResizer />} />
          <Route path="/tools/whatsapp-link-generator" element={<WhatsAppLinkGenerator />} />
          <Route path="/tools/whatsapp-text-formatter" element={<WhatsAppTextFormatter />} />
          <Route path="/tools/whatsapp-qr-generator" element={<WhatsAppQrGenerator />} />
          <Route path="/tools/whatsapp-status-resizer" element={<WhatsAppStatusResizer />} />
          <Route path="/tools/remove-duplicate-lines" element={<RemoveDuplicateLines />} />
          <Route path="/tools/text-reverser" element={<TextReverser />} />
          <Route path="/tools/upside-down-text-generator" element={<UpsideDownTextGenerator />} />
          <Route path="/tools/trim-whitespace" element={<TrimWhitespace />} />
          <Route path="/tools/slug-generator" element={<SlugGenerator />} />
          <Route path="/tools/line-counter" element={<LineCounter />} />
          <Route path="/tools/text-to-binary" element={<TextToBinary />} />
          <Route path="/tools/binary-to-text" element={<BinaryToText />} />
          <Route path="/tools/find-and-replace" element={<FindAndReplace />} />
          <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="/tools/profit-margin-calculator" element={<ProfitMarginCalculator />} />
          <Route path="/tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/tools/color-contrast-checker" element={<ColorContrastChecker />} />
          <Route path="/tools/darken-lighten-color" element={<DarkenLightenColor />} />
          <Route path="/tools/random-color-generator" element={<RandomColorGenerator />} />
          <Route path="/tools/css-formatter" element={<CssFormatter />} />
          <Route path="/tools/css-minifier" element={<CssMinifier />} />
          <Route path="/tools/html-formatter" element={<HtmlFormatter />} />
          <Route path="/tools/html-minifier" element={<HtmlMinifier />} />
          <Route path="/tools/xml-formatter" element={<XmlFormatter />} />
          <Route path="/tools/xml-minifier" element={<XmlMinifier />} />
          <Route path="/tools/javascript-minifier" element={<JavascriptMinifier />} />
          <Route path="/tools/html-entities-encoder" element={<HtmlEntitiesEncoder />} />
          <Route path="/tools/html-entities-decoder" element={<HtmlEntitiesDecoder />} />
          <Route path="/tools/jwt-decoder" element={<JwtDecoder />} />
          <Route path="/tools/md5-hash-generator" element={<Md5HashGenerator />} />
          <Route path="/tools/sha1-hash-generator" element={<Sha1HashGenerator />} />
          <Route path="/tools/sha256-hash-generator" element={<Sha256HashGenerator />} />
          <Route path="/tools/sha512-hash-generator" element={<Sha512HashGenerator />} />
          <Route path="/tools/json-to-csv" element={<JsonToCsv />} />
          <Route path="/tools/csv-to-json" element={<CsvToJson />} />
          <Route path="/tools/xml-to-json" element={<XmlToJson />} />
          <Route path="/tools/json-to-xml" element={<JsonToXml />} />
          <Route path="/tools/yaml-to-json" element={<YamlToJson />} />
          <Route path="/tools/json-to-yaml" element={<JsonToYaml />} />
          <Route path="/tools/csv-to-xml" element={<CsvToXml />} />
          <Route path="/tools/xml-to-csv" element={<XmlToCsv />} />
          <Route path="/tools/excel-to-json" element={<ExcelToJson />} />
          <Route path="/tools/csv-to-excel" element={<CsvToExcel />} />
          <Route path="/tools/random-name-picker" element={<RandomNamePicker />} />
          <Route path="/tools/random-word-generator" element={<RandomWordGenerator />} />
          <Route path="/tools/random-number-generator" element={<RandomNumberGenerator />} />
          <Route path="/tools/coin-flipper" element={<CoinFlipper />} />
          <Route path="/tools/dice-roller" element={<DiceRoller />} />
          <Route path="/tools/choice-wheel-spinner" element={<ChoiceWheelSpinner />} />
          <Route path="/tools/digital-signature-generator" element={<DigitalSignatureGenerator />} />
          <Route path="/tools/aes-encryption" element={<AesEncryption />} />
          <Route path="/tools/htpasswd-generator" element={<HtpasswdGenerator />} />
          <Route path="/tools/rsa-key-pair-generator" element={<RsaKeyPairGenerator />} />
          <Route path="/tools/subnet-calculator" element={<SubnetCalculator />} />
          <Route path="/tools/my-ip-address" element={<MyIpAddress />} />
          <Route path="/tools/dns-lookup" element={<DnsLookup />} />
          <Route path="/tools/http-header-checker" element={<HttpHeaderChecker />} />
          <Route path="/tools/url-redirect-checker" element={<UrlRedirectChecker />} />
          <Route path="/tools/barcode-generator" element={<BarcodeGenerator />} />
          <Route path="/tools/barcode-scanner" element={<BarcodeScanner />} />
          <Route path="/tools/qr-code-scanner" element={<QrCodeScanner />} />
          <Route path="/tools/svg-converter" element={<SvgConverter />} />
          <Route path="/tools/srt-to-vtt" element={<SrtToVtt />} />
          <Route path="/tools/sql-to-markdown-table" element={<SqlToMarkdownTable />} />
          <Route path="/tools/json-to-html-table" element={<JsonToHtmlTable />} />
          <Route path="/tools/yaml-to-toml" element={<YamlToToml />} />
          <Route path="/tools/robots-txt-validator" element={<RobotsTxtValidator />} />
          <Route path="/tools/json-string-escape" element={<JsonStringEscape />} />
          <Route path="/tools/anagram-name-shuffler" element={<AnagramNameShuffler />} />
          <Route path="/tools/sarcastic-text-alternator" element={<SarcasticTextAlternator />} />
          <Route path="/tools/tailwind-grid-generator" element={<TailwindGridGenerator />} />
          <Route path="/tools/glassmorphism-builder" element={<GlassmorphismBuilder />} />
          <Route path="/tools/data-uri-encoder" element={<DataUriEncoder />} />
          <Route path="/tools/base64-to-image" element={<Base64ToImage />} />
          <Route path="/tools/buzzword-bingo" element={<BuzzwordBingo />} />
          <Route path="/tools/hex-code-scroller" element={<HexCodeScroller />} />
          <Route path="/tools/lorem-ipsum-fantasy" element={<LoremIpsumFantasy />} />
          <Route path="/tools/dumb-phone-formatter" element={<DumbPhoneFormatter />} />
          <Route path="/tools/morse-audio-player" element={<MorseAudioPlayer />} />
          <Route path="/tools/morse-tap-transmitter" element={<MorseTapTransmitter />} />
          <Route path="/tools/drum-pad" element={<DrumPad />} />
          <Route path="/tools/soundboard" element={<Soundboard />} />
          <Route path="/tools/white-noise-mixer" element={<WhiteNoiseMixer />} />
          <Route path="/tools/tts-pitcher" element={<TtsPitcher />} />
          <Route path="/tools/exif-scrubber" element={<ExifScrubber />} />
          <Route path="/tools/csv-filter" element={<CsvFilter />} />
          <Route path="/tools/address-cleaner" element={<AddressCleaner />} />
          <Route path="/tools/ascii-art" element={<AsciiArt />} />
          <Route path="/tools/bubble-wrap-popper" element={<BubbleWrapPopper />} />
          <Route path="/tools/pixel-art-pad" element={<PixelArtPad />} />
          <Route path="/tools/8bit-character-creator" element={<EightBitCharacterCreator />} />
          <Route path="/tools/emoji-mashup" element={<EmojiMashup />} />
          <Route path="/tools/prompt-roulette" element={<PromptRoulette />} />
          <Route path="/tools/trivia-flashcards" element={<TriviaFlashcards />} />
          <Route path="/tools/tarot-reader" element={<TarotReader />} />
          <Route path="/tools/meme-overlay" element={<MemeOverlay />} />
          <Route path="/tools/fake-loading-screen" element={<FakeLoadingScreen />} />
          <Route path="/tools/habit-streak-counter" element={<HabitStreak />} />
          <Route path="/tools/rickroll-generator" element={<RickrollGenerator />} />
          <Route path="/tools/fake-error-designer" element={<FakeErrorDesigner />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/password-strength-checker" element={<PasswordStrengthChecker />} />
          <Route path="/tools/instagram-post-resizer" element={<InstagramPostResizer />} />
          <Route path="/tools/image-upscaler" element={<ImageUpscaler />} />
          <Route path="/tools/image-enhancer" element={<ImageEnhancer />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />

          {/* User dashboard - requires authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="history" element={<History />} />
              <Route path="shortened-urls" element={<ShortenedUrls />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="settings" element={<Settings />} />
              <Route path="subscription" element={<Subscription />} />
            </Route>
          </Route>

          {/* Admin dashboard - requires authentication AND the admin role.
              Non-admins hitting /admin/* are redirected to / by
              ProtectedRoute itself (see requireRole handling there) —
              there's no separate check needed in AdminLayout or any
              admin page below it. */}
          <Route element={<ProtectedRoute requireRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="tools" element={<AdminTools />} />
              <Route path="usage" element={<AdminUsage />} />
              <Route path="tools/new" element={<AdminToolEditor />} />
              <Route path="tools/:slug/edit" element={<AdminToolEditor />} />
              <Route path="blog" element={<AdminBlogList />} />
              <Route path="blog/new" element={<AdminBlogEditor />} />
              <Route path="blog/:slug/edit" element={<AdminBlogEditor />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="contact" element={<AdminContactMessages />} />
              <Route path="comments" element={<AdminComments />} />
            </Route>
          </Route>

          <Route path="/tools/:slug" element={<GenericToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
    </>
  )
}
