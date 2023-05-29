$(function(){

    $('html').click(function(){
      if($('#NewPW').length && $('#reNewPW').length){ // #NewPW와 #reNewPW 요소가 있는지 확인
        if($('#NewPW').val() !== $('#reNewPW').val()){ // 비밀번호가 일치하지 않는 경우
          $('#PWFail').html('비밀번호가 동일하지 않습니다.').show(); // #PWFail 요소에 텍스트 추가 및 표시
          $('#PWFailchange').hide();
        }else{
          $('#PWFail').hide(); // 비밀번호가 일치하는 경우 #PWFail 요소 숨김 처리
          $('#PWFailchange').show();  
        }
      }
    });
    
       
      
      $('#updateUserInfo').click(function(){
        if(!$('#UpdateMEMBERNickname').val()){ 
          alert('닉네임을 체크해주세요');
          $('#UpdateMEMBERNickname').focus();
          return false;
        }else if(!$('#NewPW').val()){
          alert('비밀번호를 체크해주세요');
          $('#NewPW').focus();
          return false;
        }else if(!$('#NewPW').val() < 8){
          alert('비밀번호를 8자 이상 작성해주세요');
          $('#NewPW').focus();
          return false;
        }else if(!$('#UpdateMEMBERNickname').val()){
          alert('닉네임을 체크해주세요');
          $('#UpdateMEMBERNickname').focus();
          return false;
        }else if(!$('#joinMemberEmail').val()){
          alert('이메일을 체크해주세요');
          $('#joinMemberEmail').focus();
          return false;
        }else if(!$('#joinMemberMobilesecond').val()){
          alert('전화번호를 체크해주세요');
          $('#joinMemberMobilesecond').focus();
          return false;
        }else if(!$('#joinMemberMobilethird').val()){
          alert('전화번호를 체크해주세요');
          $('#joinMemberMobilethird').focus();
          return false;
        }else if(!$('#joinMemberYear').val()){
          alert('생일을 체크해주세요');
          $('#joinMemberYear').focus();
          return false;
        }else if(!$('#joinMemberDay').val()){
          alert('생일을 체크해주세요'); 
          $('#joinMemberDay').focus();
          return false;
        }else if(!$('#joinMemberMonth').val()){
          alert('생일을 체크해주세요');
          $('#joinMemberMonth').focus();
          return false;
        }else if(!$('#joinMembergender').val()){
          alert('성별을 체크해주세요');
          $('#joinMembergender').focus();
          return false;
        }
        
        
      })
      
      
    });