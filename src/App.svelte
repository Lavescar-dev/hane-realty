<script>
  import { onDestroy, onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import AuthModal from './components/AuthModal.svelte';
  import AppointmentModal from './components/AppointmentModal.svelte';
  import ListingModal from './components/ListingModal.svelte';
  import ToastHost from './components/ToastHost.svelte';
  import HomePage from './sections/HomePage.svelte';
  import ListingsPage from './sections/ListingsPage.svelte';
  import AdvisorsPage from './sections/AdvisorsPage.svelte';
  import AboutPage from './sections/AboutPage.svelte';
  import AppointmentPage from './sections/AppointmentPage.svelte';
  import AppointmentConfirmationPage from './sections/AppointmentConfirmationPage.svelte';
  import WishlistPage from './sections/WishlistPage.svelte';
  import { listings, advisors, cities } from './data/listings.js';

  let currentPage = 'home';
  let appointmentItems = [];
  let wishlist = [];
  let currentUser = '';
  let currentListing = null;
  let authModalOpen = false;
  let appointmentSheetOpen = false;
  let mobileMenuOpen = false;
  let hydrated = false;
  let toasts = [];
  let nextToastId = 1;
  let lastAppointment = null;
  let listingsFilter = {};

  $: featuredListings = listings.slice(0, 4);
  $: wishlistListings = listings.filter((l) => wishlist.includes(l.id));

  $: if (hydrated && typeof localStorage !== 'undefined') {
    localStorage.setItem('haneAppointment', JSON.stringify(appointmentItems));
  }
  $: if (hydrated && typeof localStorage !== 'undefined') {
    localStorage.setItem('haneWishlist', JSON.stringify(wishlist));
  }
  $: if (hydrated && typeof localStorage !== 'undefined') {
    if (currentUser) localStorage.setItem('haneUser', currentUser);
    else localStorage.removeItem('haneUser');
  }

  $: if (typeof document !== 'undefined') {
    document.body.style.overflow =
      authModalOpen || appointmentSheetOpen || currentListing ? 'hidden' : 'auto';
  }

  onMount(() => {
    try { appointmentItems = JSON.parse(localStorage.getItem('haneAppointment') || '[]'); } catch { appointmentItems = []; }
    try { wishlist = JSON.parse(localStorage.getItem('haneWishlist') || '[]'); } catch { wishlist = []; }
    currentUser = localStorage.getItem('haneUser') || '';
    hydrated = true;
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') document.body.style.overflow = 'auto';
  });

  function showToast(message) {
    const id = nextToastId++;
    toasts = [...toasts, { id, message }];
    window.setTimeout(() => { toasts = toasts.filter((t) => t.id !== id); }, 2500);
  }

  function navigate(page) {
    if (page === 'appointment' && appointmentItems.length === 0) {
      showToast('Önce ilan ekleyin.');
      currentPage = 'listings';
    } else {
      currentPage = page;
    }
    appointmentSheetOpen = false;
    mobileMenuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleAuth() { authModalOpen = !authModalOpen; }
  function toggleAppointmentSheet() { appointmentSheetOpen = !appointmentSheetOpen; mobileMenuOpen = false; }
  function toggleMobileMenu() { mobileMenuOpen = !mobileMenuOpen; }
  function openListing(l) { currentListing = l; }
  function closeListing() { currentListing = null; }

  function addToAppointment(listing) {
    if (appointmentItems.find((i) => i.id === listing.id)) {
      showToast('Bu ilan zaten sepetinizde.');
      return;
    }
    appointmentItems = [...appointmentItems, listing];
    showToast(`${listing.title} sepete eklendi.`);
  }

  function removeFromAppointment(idx) {
    appointmentItems = appointmentItems.filter((_, i) => i !== idx);
  }

  function toggleWishlist(id) {
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((i) => i !== id);
      showToast('Favorilerden çıkarıldı.');
    } else {
      wishlist = [...wishlist, id];
      showToast('Favorilere eklendi.');
    }
  }

  function handleLogin(name) {
    currentUser = name;
    authModalOpen = false;
    showToast('Hoş geldiniz!');
  }

  function handleLogout() {
    currentUser = '';
    authModalOpen = false;
    showToast('Çıkış yapıldı.');
  }

  function goToAppointmentForm() {
    if (appointmentItems.length === 0) {
      showToast('Sepetiniz boş.');
      return;
    }
    appointmentSheetOpen = false;
    navigate('appointment');
  }

  function submitAppointment(detail) {
    if (appointmentItems.length === 0) return;
    const id = `HN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const uniqueAdvisors = [...new Set(appointmentItems.map((i) => i.advisor.id))]
      .map((aid) => appointmentItems.find((i) => i.advisor.id === aid).advisor);

    lastAppointment = {
      id,
      placedAt: new Date(),
      items: appointmentItems.slice(),
      advisors: uniqueAdvisors,
      ...detail,
    };
    appointmentItems = [];
    currentPage = 'appointment-confirmation';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function searchFromHero(filter) {
    listingsFilter = { ...filter };
    currentPage = 'listings';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleWindowKeydown(e) {
    if (e.key === 'Escape') {
      authModalOpen = false;
      appointmentSheetOpen = false;
      currentListing = null;
      mobileMenuOpen = false;
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div class="flex min-h-screen flex-col bg-[#fbf8f1] text-[#0f2740]">
  <Navbar
    currentUser={currentUser}
    appointmentCount={appointmentItems.length}
    wishlistCount={wishlist.length}
    currentPage={currentPage}
    mobileMenuOpen={mobileMenuOpen}
    onNavigate={navigate}
    onToggleAuth={toggleAuth}
    onToggleAppointments={toggleAppointmentSheet}
    onToggleMobileMenu={toggleMobileMenu}
  />

  <main class="flex-1">
    {#if currentPage === 'home'}
      <HomePage
        featuredListings={featuredListings}
        advisors={advisors}
        cities={cities}
        wishlist={wishlist}
        onNavigate={navigate}
        onOpenListing={openListing}
        onAddToAppointment={addToAppointment}
        onToggleWishlist={toggleWishlist}
        onSearch={searchFromHero}
      />
    {:else if currentPage === 'listings'}
      <ListingsPage
        listings={listings}
        cities={cities}
        wishlist={wishlist}
        initialFilter={listingsFilter}
        onOpenListing={openListing}
        onAddToAppointment={addToAppointment}
        onToggleWishlist={toggleWishlist}
      />
    {:else if currentPage === 'advisors'}
      <AdvisorsPage advisors={advisors} onNavigate={navigate} />
    {:else if currentPage === 'wishlist'}
      <WishlistPage
        listings={wishlistListings}
        onOpenListing={openListing}
        onAddToAppointment={addToAppointment}
        onToggleWishlist={toggleWishlist}
        onNavigate={navigate}
      />
    {:else if currentPage === 'about'}
      <AboutPage />
    {:else if currentPage === 'appointment'}
      <AppointmentPage items={appointmentItems} onSubmit={submitAppointment} />
    {:else if currentPage === 'appointment-confirmation' && lastAppointment}
      <AppointmentConfirmationPage appointment={lastAppointment} onNavigate={navigate} />
    {/if}
  </main>

  <Footer onNavigate={navigate} onSubscribe={() => showToast('Aboneliğiniz alındı.')} />

  <AuthModal
    open={authModalOpen}
    currentUser={currentUser}
    onClose={() => (authModalOpen = false)}
    onLogin={handleLogin}
    onLogout={handleLogout}
  />

  <AppointmentModal
    open={appointmentSheetOpen}
    items={appointmentItems}
    onClose={() => (appointmentSheetOpen = false)}
    onRemove={removeFromAppointment}
    onSchedule={goToAppointmentForm}
    onContinue={() => navigate('listings')}
  />

  <ListingModal
    listing={currentListing}
    wishlist={wishlist}
    onClose={closeListing}
    onAddToAppointment={(l) => { addToAppointment(l); closeListing(); }}
    onToggleWishlist={toggleWishlist}
    onOpenListing={openListing}
  />

  <ToastHost {toasts} />
</div>
