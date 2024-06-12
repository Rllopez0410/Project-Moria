<script>
  let money = 0.00;
</script>
<div class="container">
  <header>
    <div class="profile-pic"></div>
    <div class="earnings">$0.00</div>  
  </header>
</div>
<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    border: 1px solid red;
  }
  header {
    display: flex;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.58);
  }
  .profile-pic {
    background-color: rgb(84, 147, 255);
    height: 80px;
    width: 80px;
    border-radius: 5px;
  }
  .earnings {
    font-size: 32px;
    color: white;
  }
</style>