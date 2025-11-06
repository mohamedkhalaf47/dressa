import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit2, Plus, LogOut, Lock, Eye, EyeOff } from "lucide-react";
import { mockDataManager } from "../utils/mockData";
import { Dress, DressRequest, ContactSubmission } from "../types";

type AdminTab = "overview" | "dresses" | "requests" | "messages";

export const AdminPage: React.FC = () => {
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [accessCode, setAccessCode] = useState("");
	const [activeTab, setActiveTab] = useState<AdminTab>("overview");
	const [isAddingDress, setIsAddingDress] = useState(false);
	const [editingDressId, setEditingDressId] = useState<string | null>(null);

	const [newDress, setNewDress] = useState({
		name: "",
		price: "",
		image: "",
		description: "",
	});

	const ADMIN_CODE = "admin123";

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (accessCode === ADMIN_CODE) {
			setIsAuthenticated(true);
			setAccessCode("");
		} else {
			alert("Invalid access code");
		}
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		setAccessCode("");
		navigate("/");
	};

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-ivory via-soft-beige to-white flex items-center justify-center px-4">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<div className="flex justify-center mb-6">
							<Lock className="w-12 h-12 text-rose-gold" />
						</div>
						<h1 className="text-3xl font-playfair font-bold text-charcoal text-center mb-2">
							Admin Access
						</h1>
						<p className="text-gray-600 font-poppins text-center mb-8">
							Enter your access code to continue
						</p>

						<form onSubmit={handleLogin} className="space-y-6">
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									value={accessCode}
									onChange={(e) => setAccessCode(e.target.value)}
									placeholder="Enter access code"
									className="w-full px-4 py-3 border-2 border-rose-gold border-opacity-20 rounded-lg font-poppins text-charcoal placeholder-gray-400 focus:outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold focus:ring-opacity-20 transition-colors"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>

							<button
								type="submit"
								className="w-full bg-rose-gold text-white font-poppins font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all"
							>
								Login
							</button>

							<button
								type="button"
								onClick={() => navigate("/")}
								className="w-full border-2 border-rose-gold text-rose-gold font-poppins font-bold py-3 rounded-lg hover:bg-rose-gold hover:bg-opacity-10 transition-all"
							>
								Back to Home
							</button>
						</form>

						<p className="text-xs text-gray-500 font-poppins text-center mt-6">
							Demo: Use "admin123" as access code
						</p>
					</div>
				</div>
			</div>
		);
	}

	const statistics = mockDataManager.getStatistics();
	const dresses = mockDataManager.getAdminDresses();
	const dressRequests = mockDataManager.getDressRequests();
	const contactMessages = mockDataManager.getContactSubmissions();

	const handleAddDress = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newDress.name || !newDress.price || !newDress.image || !newDress.description) {
			alert("Please fill in all fields");
			return;
		}

		mockDataManager.addAdminDress({
			name: newDress.name,
			price: parseInt(newDress.price),
			image: newDress.image,
			description: newDress.description,
		});

		setNewDress({ name: "", price: "", image: "", description: "" });
		setIsAddingDress(false);
		alert("Dress added successfully!");
	};

	const handleDeleteDress = (id: string) => {
		if (confirm("Are you sure you want to delete this dress?")) {
			mockDataManager.deleteAdminDress(id);
		}
	};

	const handleUpdateRequestStatus = (id: string, status: "pending" | "contacted" | "completed") => {
		mockDataManager.updateDressRequest(id, { status });
	};

	const handleDeleteRequest = (id: string) => {
		if (confirm("Are you sure you want to delete this request?")) {
			mockDataManager.deleteDressRequest(id);
		}
	};

	const handleDeleteMessage = (id: string) => {
		if (confirm("Are you sure you want to delete this message?")) {
			mockDataManager.deleteContactSubmission(id);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-md sticky top-0 z-30">
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<h1 className="text-2xl font-playfair font-bold text-charcoal">
						Admin Dashboard
					</h1>
					<button
						onClick={handleLogout}
						className="flex items-center gap-2 px-4 py-2 text-rose-gold border-2 border-rose-gold rounded-lg font-poppins font-medium hover:bg-rose-gold hover:bg-opacity-10 transition-colors"
					>
						<LogOut className="w-4 h-4" />
						Logout
					</button>
				</div>
			</nav>

			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
					{[
						{
							label: "Total Dresses",
							value: statistics.totalDresses,
							color: "bg-blue-100 text-blue-600",
						},
						{
							label: "Pending Requests",
							value: statistics.pendingRequests,
							color: "bg-yellow-100 text-yellow-600",
						},
						{
							label: "Contacted",
							value: statistics.contactedRequests,
							color: "bg-purple-100 text-purple-600",
						},
						{
							label: "Completed",
							value: statistics.completedRequests,
							color: "bg-green-100 text-green-600",
						},
					].map((stat, index) => (
						<div key={index} className={`${stat.color} rounded-lg p-6`}>
							<p className="font-poppins text-sm opacity-80">{stat.label}</p>
							<p className="text-4xl font-playfair font-bold mt-2">{stat.value}</p>
						</div>
					))}
				</div>

				<div className="bg-white rounded-lg shadow-md">
					<div className="border-b border-gray-200 flex">
						{(["overview", "dresses", "requests", "messages"] as AdminTab[]).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`flex-1 px-6 py-4 font-poppins font-medium transition-colors capitalize ${
									activeTab === tab
										? "text-rose-gold border-b-2 border-rose-gold"
										: "text-gray-600 hover:text-charcoal"
								}`}
							>
								{tab}
							</button>
						))}
					</div>

					<div className="p-8">
						{activeTab === "overview" && (
							<div>
								<h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
									Overview
								</h2>
								<div className="space-y-4 font-poppins text-gray-700">
									<p>
										<strong>Total Messages:</strong> {statistics.totalContactMessages}
									</p>
									<p>
										<strong>All Requests:</strong>{" "}
										{statistics.pendingRequests +
											statistics.contactedRequests +
											statistics.completedRequests}
									</p>
									<p className="mt-8">
										Use the tabs above to manage dresses, view dress requests, and respond to
										customer messages.
									</p>
								</div>
							</div>
						)}

						{activeTab === "dresses" && (
							<div>
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-2xl font-playfair font-bold text-charcoal">
										Manage Dresses
									</h2>
									{!isAddingDress && (
										<button
											onClick={() => setIsAddingDress(true)}
											className="flex items-center gap-2 px-4 py-2 bg-rose-gold text-white rounded-lg font-poppins font-medium hover:bg-opacity-90 transition-colors"
										>
											<Plus className="w-4 h-4" />
											Add Dress
										</button>
									)}
								</div>

								{isAddingDress && (
									<form onSubmit={handleAddDress} className="mb-8 bg-soft-beige p-6 rounded-lg">
										<h3 className="text-lg font-playfair font-bold text-charcoal mb-4">
											Add New Dress
										</h3>
										<div className="space-y-4">
											<input
												type="text"
												placeholder="Dress Name"
												value={newDress.name}
												onChange={(e) => setNewDress({ ...newDress, name: e.target.value })}
												className="w-full px-4 py-2 border-2 border-rose-gold border-opacity-20 rounded-lg focus:border-rose-gold"
											/>
											<input
												type="number"
												placeholder="Price"
												value={newDress.price}
												onChange={(e) => setNewDress({ ...newDress, price: e.target.value })}
												className="w-full px-4 py-2 border-2 border-rose-gold border-opacity-20 rounded-lg focus:border-rose-gold"
											/>
											<input
												type="text"
												placeholder="Image URL"
												value={newDress.image}
												onChange={(e) => setNewDress({ ...newDress, image: e.target.value })}
												className="w-full px-4 py-2 border-2 border-rose-gold border-opacity-20 rounded-lg focus:border-rose-gold"
											/>
											<textarea
												placeholder="Description"
												value={newDress.description}
												onChange={(e) =>
													setNewDress({ ...newDress, description: e.target.value })
												}
												rows={3}
												className="w-full px-4 py-2 border-2 border-rose-gold border-opacity-20 rounded-lg focus:border-rose-gold"
											/>
											<div className="flex gap-4">
												<button
													type="submit"
													className="flex-1 px-4 py-2 bg-rose-gold text-white rounded-lg font-poppins font-medium hover:bg-opacity-90"
												>
													Save
												</button>
												<button
													type="button"
													onClick={() => setIsAddingDress(false)}
													className="flex-1 px-4 py-2 border-2 border-rose-gold text-rose-gold rounded-lg font-poppins font-medium hover:bg-rose-gold hover:bg-opacity-10"
												>
													Cancel
												</button>
											</div>
										</div>
									</form>
								)}

								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-gray-50 border-b">
											<tr>
												<th className="px-6 py-3 text-left font-poppins font-bold text-charcoal">
													Name
												</th>
												<th className="px-6 py-3 text-left font-poppins font-bold text-charcoal">
													Price
												</th>
												<th className="px-6 py-3 text-left font-poppins font-bold text-charcoal">
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{dresses.map((dress) => (
												<tr key={dress.id} className="border-b hover:bg-gray-50">
													<td className="px-6 py-4 font-poppins">{dress.name}</td>
													<td className="px-6 py-4 font-poppins">₹{dress.price.toLocaleString()}</td>
													<td className="px-6 py-4">
														<button
															onClick={() => handleDeleteDress(dress.id)}
															className="text-red-500 hover:text-red-700 transition-colors"
														>
															<Trash2 className="w-5 h-5" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}

						{activeTab === "requests" && (
							<div>
								<h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
									Dress Requests
								</h2>
								{dressRequests.length === 0 ? (
									<p className="text-gray-600 font-poppins">No requests yet</p>
								) : (
									<div className="space-y-4">
										{dressRequests.map((request) => (
											<div
												key={request.id}
												className="border-2 border-gray-200 rounded-lg p-6 hover:border-rose-gold transition-colors"
											>
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
													<div>
														<p className="text-xs text-gray-600 font-poppins uppercase">
															Customer
														</p>
														<p className="font-poppins font-bold text-charcoal">
															{request.customerName}
														</p>
														<p className="text-sm text-gray-600 font-poppins">
															{request.email}
														</p>
													</div>
													<div>
														<p className="text-xs text-gray-600 font-poppins uppercase">
															Dress Wanted
														</p>
														<p className="font-poppins font-bold text-charcoal">
															{request.dressName}
														</p>
														<p className="text-sm text-gray-600 font-poppins">
															Event: {new Date(request.eventDate).toLocaleDateString()}
														</p>
													</div>
													<div>
														<p className="text-xs text-gray-600 font-poppins uppercase">
															Status
														</p>
														<select
															value={request.status}
															onChange={(e) =>
																handleUpdateRequestStatus(
																	request.id,
																	e.target.value as "pending" | "contacted" | "completed"
																)
															}
															className="px-3 py-1 border-2 border-rose-gold border-opacity-20 rounded font-poppins text-sm focus:border-rose-gold"
														>
															<option value="pending">Pending</option>
															<option value="contacted">Contacted</option>
															<option value="completed">Completed</option>
														</select>
													</div>
												</div>
												<button
													onClick={() => handleDeleteRequest(request.id)}
													className="text-red-500 hover:text-red-700 transition-colors font-poppins text-sm flex items-center gap-1"
												>
													<Trash2 className="w-4 h-4" />
													Delete
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{activeTab === "messages" && (
							<div>
								<h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
									Contact Messages
								</h2>
								{contactMessages.length === 0 ? (
									<p className="text-gray-600 font-poppins">No messages yet</p>
								) : (
									<div className="space-y-4">
										{contactMessages.map((message) => (
											<div
												key={message.id}
												className="border-2 border-gray-200 rounded-lg p-6 hover:border-rose-gold transition-colors"
											>
												<div className="flex items-start justify-between mb-3">
													<div>
														<p className="font-poppins font-bold text-charcoal">
															{message.name}
														</p>
														<p className="text-sm text-gray-600 font-poppins">
															{message.email}
														</p>
													</div>
													<button
														onClick={() => handleDeleteMessage(message.id)}
														className="text-red-500 hover:text-red-700 transition-colors"
													>
														<Trash2 className="w-5 h-5" />
													</button>
												</div>
												<p className="text-sm text-gray-600 font-poppins mb-2">
													<strong>Subject:</strong> {message.subject}
												</p>
												<p className="text-gray-700 font-poppins mb-2">{message.message}</p>
												<p className="text-xs text-gray-500 font-poppins">
													{new Date(message.timestamp).toLocaleString()}
												</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
