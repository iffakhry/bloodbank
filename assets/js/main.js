/* 
 * Copyright 2013 ngengs.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


jQuery.support.cors = true;
            //cek update
            $.ajax({
                url: apiPath + 'cek_version.php?v=' + appVersion,
                dataType: "json",
                crossDomain: true,
                success: function(data)
                {
                    if (data.version != "ok") {
                        updateListKota();
                    }
                    $(document).wait('2sec');
                    $.mobile.changePage('#page-home', {transition: 'pop'});
                },
                error: function() {
                    alert('error');
                    $.mobile.changePage('#page-home', {transition: 'pop'});
                }
            })




            $("#ayo-cari").hide();
            $("#btn-ayo-cari").click(function() {
                $(this).hide();
                $("#ayo-cari").fadeIn();
            })
            $('#cari-kota a').click(function() {
                var $data = $(this).data('val');
                $('#cari-kota li').hide();
//                $('#cari-kota li').listview('refresh');


                $('#text-kota').val($(this).html());
                $('#val-kota').val($data);
                $('#judul-cari').html('Cari Darah Di Kota ' + $(this).html());
            });

            $('#cari-kota2 a').click(function() {
                var $data = $(this).data('val');
                $('#cari-kota2 li').hide();

                $('#text-kota2').val($(this).html());
                $('#val-kota2').val($data);

//                $('#cari-kota2 li').listview('refresh');//.hide();
//                $('#judul-cari2').html('Cari Darah Di Kota ' + $(this).html());
            });
            $('#cari-kota3 a').click(function() {
                var $data = $(this).data('val');
                $('#cari-kota3 li').hide();

                $('#text-kota3').val($(this).html());
                $('#val-kota3').val($data);

//                $('#cari-kota2 li').listview('refresh');//.hide();
//                $('#judul-cari2').html('Cari Darah Di Kota ' + $(this).html());
            });

            $("#ayo-cari").submit(function(e) {
                e.preventDefault();
                $.mobile.loading( 'show');
                $this = $(this);
                $.ajax({
                    type: "POST",
                    url: apiPath + 'cari.php',
                    dataType: "json",
                    crossDomain: true,
                    data: $this.serialize(),
                    success: function(data)
                    {
                        $('#list-orang').html("");
                        if (data.data == false) {
                            $('#list-orang').attr('data-autodividers', false);
                            $('#list-orang').append('<li>Not Found</li>');
                        } else {
                            $('#list-orang').attr('data-autodividers', true);
                            $.each(data, function(index, value) {
                                $('#list-orang').append('<li data-icon="forward"><a href="tel:' + value.telpon + '"><h2>' + value.nama + '</h2><p>' + value.telpon + '</p></a></li>');
                            });
                        }
                        $.mobile.changePage('#page-content-list', {transition: 'flip'});

                        $('#cari-kota li').show();
                        $("#list-orang").listview("refresh");
                        $("#cari-kota").listview("refresh");
                    },
                    error: function() {
                        alert('error: ' + apiPath + 'cari.php');
                    }
                });
            });

            $("#form-login").submit(function(e) {
                e.preventDefault();
                $.mobile.loading( 'show');
                $("#judul-login-h2").html('Login');
                $this = $(this);
                $.ajax({
                    type: "POST",
                    url: apiPath + 'login.php',
                    dataType: "json",
                    crossDomain: true,
                    data: $this.serialize(),
                    success: function(data)
                    {
//                        $('#list-orang').html("");
                        if (data.login == false) {
                            $("#judul-login-h2").html('Login Error Telpon / Sandi salah');
                        } else {
                            $.each(data, function(index, value) {
                                $('#val-kota2').val(value.id_kota);
                                $('#text-kota2').val(value.kota);
                                $('#val-id').val(value.id);
                            });
                            $("#judul-login-h2").html('Login Berhasil');
                            $('#data-login').hide();
                            $('#data-edit').fadeIn();
                            $('#val-kota2').val(data.id_kota);
                        }

                    },
                    error: function() {
                        alert('error');
                    }
                });
                
                $.mobile.loading( 'hide');
            });


            $("#form-edit").submit(function(e) {
                e.preventDefault();
                $.mobile.loading( 'show');
                $this = $(this);
//                alert($this.serialize());
                $.ajax({
//                    type: "POST",
                    url: apiPath + 'update.php',
                    dataType: "json",
//                    crossDomain: true,
                    data: $this.serialize(),
                    success: function(data)
                    {
//                        
                        $('#data-edit').fadeOut();
                        $('#cari-kota2 li').show();
                        $.mobile.changePage('#page-home', {transition: 'flip'});


                    },
                    error: function() {
                        alert('error');
//                            $('#data-edit').fadeOut();
//                            $.mobile.changePage('#page-home', {transition: 'flip'});
                    }
                });
            });


            $("#form-regis").submit(function(e) {
                e.preventDefault();
                $.mobile.loading( 'show');
                $this = $(this);
                alert($this.serialize());
                $.ajax({
//                    type: "POST",
                    url: apiPath + 'regis.php',
                    dataType: "json",
//                    crossDomain: true,
                    data: $this.serialize(),
                    success: function(data)
                    {
                        
                        $('#form-regis').fadeOut();
                        $('#cari-kota3 li').show();
                        $.mobile.changePage('#page-home', {transition: 'flip'});


                    },
                    error: function() {
                        alert('error');
//                            $('#data-edit').fadeOut();
//                            $.mobile.changePage('#page-home', {transition: 'flip'});
                    }
                });
            });

            function updateListKota() {
                $("#cari-kota").on("listviewbeforefilter", function(e, data) {
                    var $ul = $(this),
                            $input = $(data.input),
                            value = $input.val(),
                            html = "";
                    $ul.html("");
                    if (value && value.length > 2) {
                        $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
                        $ul.listview("refresh");
                        $.ajax({
                            url: apiPath + 'list_kota.php',
                            dataType: "json",
                            crossDomain: true,
                            data: {
                                q: $input.val()
                            }
                        })
                                .then(function(response) {
                                    $.each(response, function(i, val) {
                                        html += '<li><a href="#" data-val="' + val.id_kota + '">' + val.kota + '</a></li>';
                                    });
                                    $ul.html(html);
                                    $ul.listview("refresh");
                                    $ul.trigger("updatelayout");
                                });
                    }
                });
            }

            $.fn.wait = function(time, type) {
                time = time || 1000;
                type = type || "fx";
                return this.queue(type, function() {
                    var self = this;
                    setTimeout(function() {
                        $(self).dequeue();
                    }, time);
                });
            };