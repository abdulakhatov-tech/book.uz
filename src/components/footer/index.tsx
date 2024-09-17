import React from "react";

import Container from "@/layout/container";

import logo from "@/assets/icons/logo-2.svg";
import phoneIcon from "@/assets/icons/phone-icon.svg";
import emailIcon from "@/assets/icons/email-icon.svg";
import locationIcon from "@/assets/icons/location-icon.svg";
import facebookIcon from "@/assets/icons/facebook-icon.svg";
import instagramIcon from "@/assets/icons/instagram-icon.svg";
import telegramIcon from "@/assets/icons/telegram-icon.svg";
import appStore from "@/assets/images/app-store.png";
import googlePlay from "@/assets/images/google-play.png";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
	const { t } = useTranslation();

	return (
		<footer className="bg-[#171717]">
			<Container>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
					<li>
						<img src={logo} alt="Book.uz logo" />
						{/* Tagline */}
						<h4 className="text-white text-lg lg:text-xl italic font-normal mt-5 mb-3">
							Kitob – eng yaxshi sovg'a
						</h4>
						<p className="text-[14px] font-normal leading-[18.2px] text-white max-w-[236px]">
							BOOK.UZ - {t("footer.largest_shop")}
						</p>
					</li>
					<li>
						<h4 className="text-white text-lg lg:text-xl font-semibold mb-4">
							{t("footer.menu")}
						</h4>
						<ul className="flex flex-col text-white gap-3">
							<li>{t("footer.about_us")}</li>
							<li>{t("footer.how_to_purchase")}?</li>
							<li>{t("footer.delivery")}</li>
							<li>{t("footer.branch_and_diller")}</li>
						</ul>
					</li>
					<li>
						<h4 className="text-white text-lg lg:text-xl font-semibold mb-4">
							{t("footer.contacts")}
						</h4>
						<address className="flex flex-col text-white gap-3 not-italic">
							<div className="flex items-center gap-2">
								<img src={phoneIcon} alt="Phone icon" width="16" height="16" />
								<span>+998 71 275 64 84</span>
							</div>
							<div className="flex items-center gap-2">
								<img src={emailIcon} alt="Email icon" width="16" height="16" />
								<span>info@book.uz</span>
							</div>
							<div className="flex items-center gap-2">
								<img
									src={locationIcon}
									alt="Location icon"
									width="16"
									height="16"
								/>
								<span>{t("footer.location")}</span>
							</div>
							<div className="flex items-center gap-3">
								<img src={facebookIcon} alt="Facebook icon" />
								<img src={instagramIcon} alt="Instagram icon" />
								<img src={telegramIcon} alt="Telegram icon" />
							</div>
						</address>
					</li>
					<li>
						<h4 className="text-white text-lg lg:text-xl font-semibold mb-4">
							{t("footer.downloading_applications")}
						</h4>
						<ul className="flex flex-col gap-3">
							<li>
								<img src={appStore} alt="Download on the App Store" />
							</li>
							<li>
								<img src={googlePlay} alt="Get it on Google Play" />
							</li>
						</ul>
					</li>
				</ul>
				<div className="text-white flex items-center justify-between flex-col sm:flex-row py-4 border-t border-t-white gap-2">
					<p>© {new Date().getFullYear()} Book.uz</p>
					<ul className="flex items-center gap-4">
						<li>{t("footer.public")}</li>
						<li>{t("footer.politic")}</li>
					</ul>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
